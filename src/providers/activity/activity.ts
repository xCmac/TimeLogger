import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/first';
import { Activity } from '../../models/activity';
import { Log } from '../../models/log';
import { UserProvider } from '../user/user';

@Injectable()
export class ActivityProvider {
  activitiesCollection: AngularFirestoreCollection<Activity>;

  activities: Observable<Activity[]>;

  constructor(private afs: AngularFirestore,
              private userProvider: UserProvider) {
  }

  public setReferences(uid: string) {
    this.activitiesCollection = this.afs.collection<Activity>('activities');
    this.activities = this.afs.collection('activities', ref => {
        return ref.where("userId", "==", uid);
      }).snapshotChanges().map(changes => {
        return changes.map(action => {
          if(action.type === "modified") {
            this.updateLogsAfterActivityModification(uid, action);
          }

          if(action.type === "removed") {
            console.log("Activity Removed");
          }

          return {
            id: action.payload.doc.id,
            userId: action.payload.doc.get('userId'),
            name: action.payload.doc.get('name'),
            color: action.payload.doc.get('color')
          };
        });
      }).shareReplay();
  }

  private updateLogsAfterActivityModification(uid: string, action: DocumentChangeAction) {
    this.afs.collection('logs', ref => {
      return ref.where("userId", "==", uid).where("activity.id", "==", action.payload.doc.id);
    }).snapshotChanges().map(changes => {
      return changes.map(action => {
        return action.payload.doc.id;
      });
    }).first().subscribe(logIds => {
      var batch = this.afs.firestore.batch();
      logIds.forEach(id => {
        batch.update(this.afs.doc<Log>(`logs/${id}`).ref, {
          "activity": {
            id: action.payload.doc.id,
            userId: uid,
            name: action.payload.doc.get('name'),
            color: action.payload.doc.get('color')
          }
        });
      });

      batch.commit();
    });
  }

  public createDefaultActivities() {
    this.activitiesCollection.add({userId: this.userProvider.userId, name: "Work", color: "red"});
    this.activitiesCollection.add({userId: this.userProvider.userId, name: "Sleep", color: "pink"});
    this.activitiesCollection.add({userId: this.userProvider.userId, name: "Hobbies", color: "purple"});
  }

  public createActivity(name: string, color?: string) {
    if(!name) return;

    this.activitiesCollection.add({userId: this.userProvider.userId, name: name, color: "purple"});
  }

  public getActivityObservableById(id: string): Observable<any> {
    return this.activities.map(activities => {
      return activities.find(activity => {
        return activity.id === id;
      });
    });
  }

  public updateActivity(activity: Activity) {
    if(!activity) return;

    this.afs.doc<Activity>(`activities/${activity.id}`).update({ 
      userId: activity.userId,
      name: activity.name,
      color: activity.color
    });
  }

  public deleteActivity(activityId: string) {
    if(!activityId) return;

    this.afs.doc(`activities/${activityId}`).delete();
  }
}
