import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-activity-options-popover',
  templateUrl: 'activity-options-popover.html',
})
export class ActivityOptionsPopoverPage {

  activities: Observable<any[]>;
  newActivity: string = "";

  constructor(public navCtrl: NavController, 
              private activityProvider: ActivityProvider) {

    this.activities = this.activityProvider.readActivities();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityOptionsPopoverPage');
  }

  createNewActivity() {
    this.activityProvider.createActivity(this.newActivity);
  }

  updateActivity() {
    console.log("Updating activity");
  }

}
