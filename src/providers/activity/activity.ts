import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../../models/activity';

@Injectable()
export class ActivityProvider {
  activitiesCollection: AngularFirestoreCollection<Activity>;
  activities: Observable<any>;

  constructor(private afs: AngularFirestore) {
  }

  public setReferences(uid: string) {
    this.activitiesCollection = this.afs.collection('activities');
    this.activities = this.afs.collection('activities', ref => {
        return ref.where("userId", "==", uid);
      }).snapshotChanges().map(changes => {
        return changes.map(action => ({
          id: action.payload.doc.id,
          name: action.payload.doc.get('name'),
          color: action.payload.doc.get('color')
        }));
      });
  }

  public createDefaultActivities(uid: string) {
    this.activitiesCollection.add({userId: uid, name: "Work", color: "red"});
    this.activitiesCollection.add({userId: uid, name: "Sleep", color: "pink"});
    this.activitiesCollection.add({userId: uid, name: "Hobbies", color: "purple"});
  }

  public getActivity(id: string): Observable<any> {
    if(!id) return;

    return this.activitiesCollection.doc(id).snapshotChanges();
  }

  public createActivity(uid: string, name: string, color?: string) {
    if(!name) return;

    this.activitiesCollection.add({userId: uid, name: name, color: "purple"});
  }

  public updateActivity(activityId: string, activity: Activity) {
    if(!activityId || !activity) return;

    this.afs.doc(`activities/${activityId}`).update(activity);
  }

  public deleteActivity(activityId: string) {
    if(!activityId) return;

    this.afs.doc(`activities/${activityId}`).delete();
  }
}
