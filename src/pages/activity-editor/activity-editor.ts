import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController  } from 'ionic-angular';
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
              private activityProvider: ActivityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityEditorPage');
  }

  updateActivity(activity: Activity) {
    console.log("Editing called");
    let alert = this.alertCtrl.create({
      title: 'Edit',
      inputs: [
        {
          name: 'name',
          placeholder: activity.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (String(data).length < 1 ) {
              return false;
            } else {
              this.activityProvider.updateActivity(activity.$key, data);
            }
          }
        }
      ]
    });
    alert.present();
    
  }

  deleteActivity(activity: Activity) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this activity?',
      message: 'All hours regarding this activity will be lost are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Agree clicked');
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
