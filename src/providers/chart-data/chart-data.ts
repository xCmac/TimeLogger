import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Log } from '../../models/log';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserProvider } from '../user/user';

@Injectable()
export class ChartDataProvider {

  constructor(private afs: AngularFirestore,
              private userProvider: UserProvider) {
  }

  public getLast7DaysLogs(): Promise<Log[]> {
    return this.afs.collection('logs', ref => {
      let date = new Date();
      date.setDate(date.getDate() - 7);
      date.setHours(0, 0, 0, 0);
      return ref.where("userId", "==", this.userProvider.userId).where("date", ">", date)
    }).ref.get().then(data => {
      return data.docChanges.map(action => {
        return {
          id: action.doc.id,
          userId: action.doc.get('userId'),
          activity: action.doc.get('activity'),
          date: action.doc.get('date'),
          blockNumber: action.doc.get('blockNumber')
        };
      });
    });
  } 

  public getThisYearsLogs(): Promise<Log[]> {
    return this.afs.collection('logs', ref => {
      let date = new Date();
      date.setDate(1);
      date.setMonth(0);
      date.setHours(0, 0, 0, 0);
      return ref.where("userId", "==", this.userProvider.userId).where("date", ">=", date);
    }).ref.get().then(data => {
      return data.docChanges.map(action => {
        return {
          id: action.doc.id,
          userId: action.doc.get('userId'),
          activity: action.doc.get('activity'),
          date: action.doc.get('date'),
          blockNumber: action.doc.get('blockNumber')
        };
      });
    });
  }
}
