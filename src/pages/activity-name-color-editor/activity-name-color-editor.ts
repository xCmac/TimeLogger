import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';

@IonicPage()
@Component({
  selector: 'page-activity-name-color-editor',
  templateUrl: 'activity-name-color-editor.html',
})
export class ActivityNameColorEditorPage {

  name: string = '';

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private activityProvider: ActivityProvider) {
  }

  getActivityName(): string {
    return this.navParams.data.name;
  }

  closePopover() {
    this.activityProvider.updateActivity(this.navParams.data.$key, this.name);
    this.viewCtrl.dismiss();
  }

}
