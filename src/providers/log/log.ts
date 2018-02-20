import { Injectable } from '@angular/core';
import { Log } from '../../models/log';
import { Activity } from '../../models/activity';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { TimeBlock } from '../../models/timeblock';

@Injectable()
export class LogProvider {
  logsCollection: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;
  today: Date;

  constructor(private afs: AngularFirestore,
              private userProvider: UserProvider) {
  }

  public setReferences(uid: string, logDate: Date) {
    this.logsCollection = this.afs.collection('logs');
    this.logs = this.afs.collection('logs', ref => {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      return ref.where("userId", "==", uid).where("date", "==", date);
    }).snapshotChanges().map(changes => {
      return changes.map(action => {
        return {
          id: action.payload.doc.id,
          userId: action.payload.doc.get('userId'),
          activity: action.payload.doc.get('activity'),
          date: action.payload.doc.get('date'),
          blockNumber: action.payload.doc.get('blockNumber')
        };
      });
    });
  }

  public getLogObservableByBlockNumber(blockNumber: number): Observable<any> {
    if (!this.logs) {
      return;
    }

    return this.logs.map(logs => {
      return logs.find(log => {
        return log.blockNumber == blockNumber;
      });
    });
  }

  public logActivity(timeBlock: TimeBlock, activity: Activity) {
    let date = new Date();
    date.setHours(0, 0, 0, 0);

    let log: Log = {
      userId: this.userProvider.userId,
      date: date,
      activity: activity,
      blockNumber: timeBlock.name,
    };

    if (!timeBlock.logId) {
      this.createNewLog(log);
    } else {
      this.updateLog(log, timeBlock.logId);
    }
  }

  private createNewLog(log: Log) {
    this.logsCollection.add(log);
  }

  private updateLog(log: Log, logId: string) {
    this.afs.doc<Log>(`logs/${logId}`).update({
      userId: log.userId,
      date: log.date,
      blockNumber: log.blockNumber,
      activity: log.activity
    });
  }
}
