import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
import { LogProvider } from '../../providers/log/log';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  currentDate: Date;

  constructor(public navCtrl: NavController,
              private logProvider: LogProvider,
              private userProvider: UserProvider,
              private modalCtrl: ModalController) {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
    this.currentDate.setMinutes(0, 0, 0);

  }

  showActivityEditor() {
    let modal = this.modalCtrl.create("ActivityEditorPage");
    modal.present();
  }

  swipeEvent(e) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setMinutes(0, 0, 0);
    switch (e.offsetDirection) {
      case 2: //next
        if (this.currentDate.getTime() === today.getTime()) {
          break;
        }
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
        this.logProvider.setReferences(this.userProvider.userId, this.currentDate);
        break;
      case 4: //previous
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
        this.logProvider.setReferences(this.userProvider.userId, this.currentDate);
        break;

      default:
        break;
    }
  }

}
