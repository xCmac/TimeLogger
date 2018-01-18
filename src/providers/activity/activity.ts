import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../../models/activity';

@Injectable()
export class ActivityProvider {
  activitiesRef:  AngularFireList<any>;
  activities: Observable<Activity[]>

  constructor(private afDatabase: AngularFireDatabase) {
    console.log('Hello ActivityProvider Provider');
  }

  public setReferences(uid: string) {
    this.activitiesRef = this.afDatabase.list(`activities/${uid}`);
    this.activities = this.activitiesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  public createDefaultActivities() {
    this.activitiesRef.push({ name: 'work' });
    this.activitiesRef.push({ name: 'sleep' });
    this.activitiesRef.push({ name: 'hobbies' });
  }

  public createActivity(name: string) {
    if(!name) return;
    this.activitiesRef.push({ name: name });
  }

  public readActivities(): Observable<any[]> {
    return this.activitiesRef.valueChanges();
  }

  public updateActivity(key: string, name: string) {
    if(!key || !name) return;
    this.activitiesRef.update(key, { name: name });
  }

  public deleteActivity(key: string) {
    if(!key) return;
    this.activitiesRef.remove(key); 
  }
}
