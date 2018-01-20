import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, PopoverController  } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Activity } from '../../models/activity';

@IonicPage()
@Component({
  selector: 'page-activity-editor',
  templateUrl: 'activity-editor.html',
})
export class ActivityEditorPage {

  isEditing: boolean = false;

  constructor(public navCtrl: NavController, 
              private viewCtrl: ViewController, 
              private alertCtrl: AlertController, 
              private popoverCtrl: PopoverController,
              private activityProvider: ActivityProvider) {
  }

  showEditPopover(activity: Activity) {
    let popover = this.popoverCtrl.create('ActivityNameColorEditorPage', activity);
    popover.present();
  }

  deleteActivity(activity: Activity) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this activity?',
      message: 'All hours regarding this activity will be lost are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.activityProvider.deleteActivity(activity.$key);
          }
        }
      ]
    });
    confirm.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
