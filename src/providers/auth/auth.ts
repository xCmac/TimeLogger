import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivityProvider } from '../activity/activity';
import { LogProvider } from '../log/log';

@Injectable()
export class AuthProvider {

  user: any;

  usersCollection: AngularFirestoreCollection<any>;


  constructor(private afAuth: AngularFireAuth, 
              private afDatabase: AngularFireDatabase,
              private afs: AngularFirestore,
              private activityProvider: ActivityProvider,
              private logProvider: LogProvider) {
    this.afAuth.authState.subscribe(user => {
      if(user) { 
        this.user = user; 
      }
    });

    this.usersCollection = this.afs.collection(`users/`);
  }

  async login(email: string, password: string) {
    this.user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.activityProvider.setReferences(this.user.uid);
    this.logProvider.setReferences(this.user.uid, new Date());
  }

  async register(email: string, password: string) {
    this.user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    if (this.user) {
      this.afDatabase.database.ref('/users')
      .child(this.user.uid)
      .set({email: email });
      this.activityProvider.setReferences(this.user.uid);
      this.logProvider.setReferences(this.user.uid, new Date());
      this.activityProvider.createDefaultActivities(this.user.uid);
      
      this.usersCollection.doc(this.user.uid).set({email: email});
    }
  }

  async logout() {
    this.afAuth.auth.signOut();
  }

}
