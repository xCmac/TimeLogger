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

  swipeEvent(e) {
    switch (e.offsetDirection) {
      case 2: //right to left
        console.log("Next");
        break;
      case 4: //left to right
        console.log("Previous");
        break;
        
      default:
        break;
    }
  }

}
