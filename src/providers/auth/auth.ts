import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { ActivityProvider } from '../activity/activity';

@Injectable()
export class AuthProvider {

  user: any;

  constructor(private afAuth: AngularFireAuth, private activityProvider: ActivityProvider) {
    this.afAuth.authState.subscribe(user => {
      if(user) { 
        this.user = user; 
      }
    });
  }

  async login(email: string, password: string) {
    this.user = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    var data = await this.activityProvider.readActivities(this.user.uid);

    console.log(data);
  }

  async register(email: string, password: string) {
    this.user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    this.afAuth.auth.signOut();
  }

}
