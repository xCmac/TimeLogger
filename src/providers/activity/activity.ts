import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ActivityProvider {

  constructor(private afDatabase: AngularFireDatabase) {
    console.log('Hello ActivityProvider Provider');
  }

  createDefaultActivities() {

  }

  createActivity() {

  }

  readActivities(id: string) {
    let query: string = `activities/${id}`;

    return this.afDatabase.list(query).valueChanges();
  }

  updateActivity() {

  }

  deleteActivity() {

  }
}
