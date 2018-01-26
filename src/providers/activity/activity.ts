import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import { Activity } from '../../models/activity';
import { UserProvider } from '../user/user';

@Injectable()
export class ActivityProvider {
  activitiesCollection: AngularFirestoreCollection<Activity>;
  activities: Observable<Activity[]>;

  constructor(private afs: AngularFirestore, private userProvider: UserProvider) {
  }

  public setReferences(uid: string) {
    this.activitiesCollection = this.afs.collection<Activity>('activities');
    this.activities = this.afs.collection('activities', ref => {
        return ref.where("userId", "==", uid);
      }).snapshotChanges().map(changes => {
        return changes.map(action => ({
          id: action.payload.doc.id,
          userId: action.payload.doc.get('userId'),
          name: action.payload.doc.get('name'),
          color: action.payload.doc.get('color')
        }));
      }).shareReplay();
  }

  public createDefaultActivities(uid: string) {
    this.activitiesCollection.add({userId: uid, name: "Work", color: "red"});
    this.activitiesCollection.add({userId: uid, name: "Sleep", color: "pink"});
    this.activitiesCollection.add({userId: uid, name: "Hobbies", color: "purple"});
  }

  public createActivity(name: string, color?: string) {
    if(!name) return;

    this.activitiesCollection.add({userId: this.userProvider.userId, name: name, color: "purple"});
  }

  public updateActivity(activity: Activity) {
    console.log("activity: ", activity);
    if(!activity) return;

    this.afs.doc(`activities/${activity.id}`).update(activity);
  }

  public deleteActivity(activityId: string) {
    if(!activityId) return;

    this.afs.doc(`activities/${activityId}`).delete();
  }
}
