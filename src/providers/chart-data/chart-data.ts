import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Log } from '../../models/log';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ChartDataProvider {
  private _last7DaysLogs: Observable<Log[]>;
  private _thisYearsLogs: Observable<Log[]>;

  constructor(private afs: AngularFirestore) {
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
          activity: action.payload.doc.get('activity'),
          date: action.payload.doc.get('date'),
          blockNumber: action.payload.doc.get('blockNumber')
        };
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
          activity: action.payload.doc.get('activity'),
          date: action.payload.doc.get('date'),
          blockNumber: action.payload.doc.get('blockNumber')
        };
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
