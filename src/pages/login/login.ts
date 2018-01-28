import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from "../../models/user";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogProvider } from '../../providers/log/log';
import { ActivityProvider } from '../../providers/activity/activity';
import { forkJoin } from 'rxjs/observable/forkJoin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {email: 'aaaa@b.com', password: '123456'};
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, 
              private toastCtrl: ToastController, 
              private formBuilder: FormBuilder,
              private authProvider: AuthProvider,
              private logProvider: LogProvider,
              private activityProvider: ActivityProvider) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  async login() {
    try {
      await this.authProvider.login(this.user.email, this.user.password);
      this.navCtrl.setRoot('TabsPage');

      // forkJoin(this.activityProvider.activities, this.logProvider.logs).subscribe(([activities, logs]) => {
      //   if(activities && logs) {
      //     this.navCtrl.setRoot('TabsPage');
      //   }
      // });
    } catch (e) {
      this.presentToast(e.message);
      console.error(e);
    }
  }

  async register() {
    try {
      await this.authProvider.register(this.user.email, this.user.password);
      
      forkJoin(this.activityProvider.activities, this.logProvider.logs).subscribe(([activities, logs]) => {
        if(activities && logs) {
          this.navCtrl.setRoot('TabsPage');
        }
      });
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
