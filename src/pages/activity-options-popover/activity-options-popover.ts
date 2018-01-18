import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../../models/activity';

@IonicPage()
@Component({
  selector: 'page-activity-options-popover',
  templateUrl: 'activity-options-popover.html',
})
export class ActivityOptionsPopoverPage {
  newActivity: string = '';

  constructor(public navCtrl: NavController, 
              private activityProvider: ActivityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityOptionsPopoverPage');
  }

  createNewActivity() {
    this.activityProvider.createActivity(this.newActivity);
    this.newActivity = '';
  }

  updateActivity(activity: Activity) {
    console.log("Updating activity");
    this.activityProvider.updateActivity(activity.$key, activity.name);
  }

  deleteActivity(activity: Activity) {
    this.activityProvider.deleteActivity(activity.$key);
  }

  showActivitesCRUDModal() {
    console.log("Showing activities CRUD modal");
  }

}
