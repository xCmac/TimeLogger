import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Log } from '../../models/log';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivityProvider } from '../activity/activity';
import { UserProvider } from '../user/user';

@Injectable()
export class ChartDataProvider {
  private _last7DaysLogs: Observable<Log[]>;
  private _thisYearsLogs: Observable<Log[]>;

  constructor(private afs: AngularFirestore,
    private activityProvider: ActivityProvider,
    private userProvider: UserProvider) {
  }

  public setReferences(uid: string) {
    this._last7DaysLogs = this.afs.collection('logs', ref => {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      date.setHours(0, 0, 0, 0);
      return ref.where("userId", "==", uid).where("date", ">", date);
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

    this._thisYearsLogs = this.afs.collection('logs', ref => {
      let date = new Date();
      date.setDate(1);
      date.setMonth(0);
      date.setHours(0, 0, 0, 0);
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

  get last7DaysLogs(): Observable<Log[]> {
    return this._last7DaysLogs;
  }

  get thisYearsLogs(): Observable<Log[]> {
    return this._thisYearsLogs;
  }
}
