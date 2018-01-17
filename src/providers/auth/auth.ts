import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  user: any;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    this.afAuth.authState.subscribe(user => {
      if(user) { 
        this.user = user; 
      }
    });
  }

  async login(email: string, password: string) {
    console.log("Login called");
    this.user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    console.log("register called");
    this.user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    this.afAuth.auth.signOut();
  }

}
