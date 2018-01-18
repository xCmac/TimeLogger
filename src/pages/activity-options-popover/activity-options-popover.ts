import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController  } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Activity } from '../../models/activity';

@IonicPage()
@Component({
  selector: 'page-activity-options-popover',
  templateUrl: 'activity-options-popover.html',
})
export class ActivityOptionsPopoverPage {
  newActivity: string = '';

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController, 
              private activityProvider: ActivityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityOptionsPopoverPage');
  }

  createNewActivity() {
    this.activityProvider.createActivity(this.newActivity);
    this.newActivity = '';
  }

  showActivityEditor() {
    let modal = this.modalCtrl.create("ActivityEditorPage");
    modal.present();
  }

}
