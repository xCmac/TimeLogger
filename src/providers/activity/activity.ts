import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../../models/activity';

@Injectable()
export class ActivityProvider {
  activitiesRef:  AngularFireList<any>;
  activities: Activity[];

  constructor(private afDatabase: AngularFireDatabase) {
  }

  public setReferences(uid: string) {
    this.activitiesRef = this.afDatabase.list(`activities/${uid}`);
    this.activitiesRef.snapshotChanges().subscribe(changes => {
      this.activities = changes.map(data => {
        let activity: Activity = {
          $key: data.key,
          name: data.payload.val().name
        }

        return activity;
      });
      
    });
  }

  public getActivityById(id: string) {
    return this.activities.find(activity => {
      return activity.$key === id;
    })
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

  public readActivities() {
    return this.activitiesRef.valueChanges();
  }

  private convertToActivity(data: any) {
    let activity: Activity;

    activity.$key = data.key;
    activity.name = data.payload.val();

    return activity;
  }

  public updateActivity(key: string, name: string) {
    if(!key || !name) return;
    this.activitiesRef.update(key, name);
  }

  public deleteActivity(key: string) {
    if(!key) return;
    this.activitiesRef.remove(key); 
  }
}
