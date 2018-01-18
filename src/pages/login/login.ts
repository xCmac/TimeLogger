import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from "../../models/user";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {email: 'a@b.com', password: '123456'} as User;
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, 
              private toastCtrl: ToastController, 
              private formBuilder: FormBuilder,
              private authProvider: AuthProvider) {

    this.user.email = "a@b.com";
    this.user.password = "123456";
    
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  async login() {
    try {
      await this.authProvider.login(this.user.email, this.user.password);
      this.navCtrl.setRoot('TabsPage');
    } catch (e) {
      this.presentToast(e.message);
      console.error(e);
    }
  }

  async register() {
    try {
      await this.authProvider.register(this.user.email, this.user.password);
      this.navCtrl.setRoot('TabsPage');
    } catch (e) {
      this.presentToast(e.message);
      console.error(e);
    }
  }

  submit(type: string) {
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
