import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivityProvider } from '../activity/activity';
import { Log } from '../../models/log';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';

@Injectable()
export class LogProvider {
  logsCollection: AngularFirestoreCollection<Log>;
  logs: Observable<any>;
  today: Date;

  constructor(private afs: AngularFirestore,
              private activityProvider: ActivityProvider,
              private userProvider: UserProvider) {
  }

  public setReferences(uid: string, logDate: Date) {
    logDate.setHours(0, 0, 0, 0);
    this.today = logDate;

    this.logsCollection = this.afs.collection('logs');
    this.logs = this.afs.collection('logs', ref => {
      return ref.where("userId", "==", uid);
    }).snapshotChanges().map(changes => {
      return changes.map(action => ({
        id: action.payload.doc.id,
        userId: action.payload.doc.get('userId'),
        date: action.payload.doc.get('date'),
        blockNumber: action.payload.doc.get('blockNumber'),
        activityId: action.payload.doc.get('activityId') 
      }));
    });
  }

  private setLast7DaysLogs() {
  }

  public logActivity(log: Log) {
    if (!log.id) {
      this.createNewLog(log);
    }
    else {
      this.updateLog(log);
    }
  }

  private createNewLog(log: Log) {
    this.logsCollection.add(log);
  }

  private updateLog(log: Log) {
    this.afs.doc(`logs/${log.id}`).update({
      userId: log.userId,
      date: log.date,
      blockNumber: log.blockNumber,
      activityId: log.activityId
    });
  }

  public getLast7Days(currentDate: string) {
  }
}
