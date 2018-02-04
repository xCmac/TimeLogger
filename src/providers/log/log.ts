import { Injectable } from '@angular/core';
import { ActivityProvider } from '../activity/activity';
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
  last7DaysLogs: Observable<Log[]>;
  today: Date;

  constructor(private afs: AngularFirestore,
              private activityProvider: ActivityProvider,
              private userProvider: UserProvider) {
  }

  public setReferences(uid: string, logDate: Date) {
    this.logsCollection = this.afs.collection('logs');
    this.logs = this.afs.collection('logs', ref => {
      return ref.where("userId", "==", uid);
    }).snapshotChanges().map(changes => {
      return changes.map(action => {
        return {
          id: action.payload.doc.id,
          userId: action.payload.doc.get('userId'),
          activityId: action.payload.doc.get('activityId'),
          date: action.payload.doc.get('date'),
          blockNumber: action.payload.doc.get('blockNumber')
        };
      });
    }).map((result, index) => {
      return result.map((log: Log) => {
        log.activity = this.activityProvider.getActivityObservableById(log.activityId);
        return log;
      });
    });

    this.last7DaysLogs = this.afs.collection('logs', ref => {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      return ref.where("userId", "==", uid).where("date", ">=", date);
    }).snapshotChanges().map(changes => {
      return changes.map(action => {
        return {
          id: action.payload.doc.id,
          userId: action.payload.doc.get('userId'),
          activityId: action.payload.doc.get('activityId'),
          date: action.payload.doc.get('date'),
          blockNumber: action.payload.doc.get('blockNumber')
        };
      });
    }).map((result, index) => {
      return result.map((log: Log) => {
        log.activity = this.activityProvider.getActivityObservableById(log.activityId);
        return log;
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
    let log: Log = {
      userId: this.userProvider.userId,
      date: new Date(),
      activityId: activity.id,
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
      activityId: log.activityId
    });
  }
}
