import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Activity } from '../../models/activity';
import { LogProvider } from '../../providers/log/log';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { TimeBlock } from '../../models/timeblock';

@IonicPage()
@Component({
  selector: 'page-activity-options-popover',
  templateUrl: 'activity-options-popover.html',
})
export class ActivityOptionsPopoverPage {
  newActivity: string = '';

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController, 
              private activityProvider: ActivityProvider,
              private logProvider: LogProvider,
              private navParams: NavParams,
              private viewCtrl: ViewController) {
  }

  createNewActivity() {
    this.activityProvider.createActivity(this.newActivity);
    this.newActivity = '';
  }

  showActivityEditor() {
    let modal = this.modalCtrl.create("ActivityEditorPage");
    modal.present();
  }

  logActivity(activity: Activity) {
    this.navParams.data.forEach((block: TimeBlock) => {
      this.logProvider.logActivity(block, activity);
    });
    this.viewCtrl.dismiss();
  }

  
}
