import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActivityProvider } from '../activity/activity';
import { Log } from '../../models/log';
// import { Activity } from '../../models/activity';

@Injectable()
export class LogProvider {
  logsRef: AngularFireList<any>;
  logs: Log[];

  constructor(private afDatabase: AngularFireDatabase,
              private activityProvider: ActivityProvider) {
  }

  public setReferences(uid: string, logDate: Date) {
    let month: string = ("0" + (logDate.getMonth() + 1)).slice(-2);
    let date: string = ("0" + logDate.getDate()).slice(-2);

    this.logsRef = this.afDatabase.list(`logs/${uid}/${month}${date}${logDate.getFullYear()}`);
  }

  public getDayLogs(uid: string) {
    this.logsRef.snapshotChanges().subscribe(changes => {
      this.logs = changes.map(data => {
        let log: Log = {
          $key: data.key,
          activity: this.activityProvider.getActivityById(data.payload.val().activityID),
          blockNumber: data.payload.val().blockNumber
        }

        return log;
      })
    })
  }

  public logActivity(block: number, activityID: string) {
    this.logsRef.push({
      blockNumber: block,
      activityID: activityID
    });
  }
}
