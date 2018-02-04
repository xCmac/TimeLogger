import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ActivityProvider } from '../activity/activity';
import { ChartDataProvider } from '../chart-data/chart-data';
import { LogProvider } from '../log/log';
import { UserProvider } from '../user/user';
import { User } from '../../models/user';

@Injectable()
export class AuthProvider {
  user: any;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private afAuth: AngularFireAuth, 
              private afs: AngularFirestore,
              private activityProvider: ActivityProvider,
              private userProvider: UserProvider,
              private logProvider: LogProvider,
              private chartDataProvider: ChartDataProvider) {
    this.afAuth.authState.subscribe(user => {
      if(user) { 
        this.user = user;
        this.userProvider.userId = user.uid;
      }
    });

    this.usersCollection = this.afs.collection(`users/`);
  }

  async login(email: string, password: string) {
    this.user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.setProviderReferences();

  }

  async register(email: string, password: string) {
    this.user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    if (this.user) {
      this.setProviderReferences();
      this.activityProvider.createDefaultActivities();
      
      this.usersCollection.add({email: email, userId: this.user.uid});
    }
  }

  private setProviderReferences() {
    this.activityProvider.setReferences(this.user.uid);
    this.logProvider.setReferences(this.user.uid, new Date());
    this.chartDataProvider.setReferences(this.user.uid);
  }

  async logout() {
    this.afAuth.auth.signOut();
  }

  public getUserId(): string {
    return this.user.uid;
  }

}
