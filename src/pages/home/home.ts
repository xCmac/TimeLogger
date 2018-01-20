import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController) {

  }

  showActivityEditor() {
    let modal = this.modalCtrl.create("ActivityEditorPage");
    modal.present();
  }

}
