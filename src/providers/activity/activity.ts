import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Activity } from '../../models/activity';

@Injectable()
export class ActivityProvider {
  activitiesRef:  AngularFireList<any>;
  activities: Activity[];

  activitiesDocument: AngularFirestoreDocument<any>;
  activitiesFS: Observable<any>;

  constructor(private afDatabase: AngularFireDatabase, private afs: AngularFirestore) {
  }

  public setReferences(uid: string) {
    this.activitiesRef = this.afDatabase.list(`activities/${uid}`);
    this.setActivites();

    this.activitiesDocument = this.afs.doc(`activities/${uid}`);
    this.activitiesFS = this.activitiesDocument.valueChanges();
  }

  private setActivites() {
    this.activitiesRef.snapshotChanges().subscribe(changes => {
      this.activities = changes.map(data => {
        let activity: Activity = {
          $key: data.key,
          name: data.payload.val().name,
          color: data.payload.val().color
        };

        return activity;
      });

    });
  }

  public getActivityById(id: string): Activity {
    return this.activities.find(activity => {
      return activity.$key === id;
    });
  }

  public createDefaultActivities(uid: string) {
    this.activitiesDocument.set({ activities: ['work', 'sleep', 'hobbies'] });
    this.activitiesFS.subscribe(data => {
      console.log(data);
    });
  }

  public createActivity(name: string) {
    if(!name) return;
    this.activitiesRef.push({ name: name });
  }

  public readActivities() {
    return this.activitiesRef.valueChanges();
  }

  public updateActivity(key: string, name: string, color: string) {
    if(!key || !name || !color) return;
    this.activitiesRef.update(key, { name: name, color: color });
  }

  public deleteActivity(key: string) {
    if(!key) return;
    this.activitiesRef.remove(key); 
  }
}
