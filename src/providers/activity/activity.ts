import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivityProvider {
  activitiesRef:  AngularFireList<any>;
  logsRef: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase) {
    console.log('Hello ActivityProvider Provider');
  }

  public setReferences(uid: string) {
    this.activitiesRef = this.afDatabase.list(`activities/${uid}`);
    this.logsRef = this.afDatabase.list(`logs/${uid}`);
  }

  public createDefaultActivities() {
    this.activitiesRef.push('work');
    this.activitiesRef.push('sleep');
    this.activitiesRef.push('hobbies');
  }

  public createActivity(name: string) {
    this.activitiesRef.push(name);
  }

  public readActivities(): Observable<any[]> {
    return this.activitiesRef.valueChanges();
  }

  public updateActivity(key: string, name: string) {
  }

  public deleteActivity() {

  }
}
