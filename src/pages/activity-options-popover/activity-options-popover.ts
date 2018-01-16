import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-activity-options-popover',
  templateUrl: 'activity-options-popover.html',
})
export class ActivityOptionsPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityOptionsPopoverPage');
  }

}
