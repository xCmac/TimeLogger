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

  setReferences(uid: string) {
    this.activitiesRef = this.afDatabase.list(`activities/${uid}`);
    this.logsRef = this.afDatabase.list(`logs/${uid}`);
  }

  createDefaultActivities(uid: string) {
    this.activitiesRef.push('work');
    this.activitiesRef.push('sleep');
    this.activitiesRef.push('hobbies');
  }

  createActivity() {

  }

  readActivities(id: string): Observable<any[]>{
    return this.activitiesRef.valueChanges();
  }

  updateActivity() {

  }

  deleteActivity() {

  }
}
