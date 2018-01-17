import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController  } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loginForm: FormGroup;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private toastCtrl: ToastController, 
    private formBuilder: FormBuilder) {
    
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      }
    }
    catch (e) {
      this.presentToast(e.message);
      console.error(e);
    }
  }

  async register() {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (result) {
        this.navCtrl.setRoot('TabsPage');
      }
    } catch (e) {
      this.presentToast(e.message);
      console.error(e);
    }
  }

  private submit(type: string) {
    if (type === "login") {
      this.login();
    }
    else {
      this.register();
    }
  }

  private presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }

}
