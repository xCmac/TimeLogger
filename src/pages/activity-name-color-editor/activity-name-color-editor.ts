import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';

@IonicPage()
@Component({
  selector: 'page-activity-name-color-editor',
  templateUrl: 'activity-name-color-editor.html',
})
export class ActivityNameColorEditorPage {

  name: string = '';

  constructor(private navCtrl: NavController, 
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private activityProvider: ActivityProvider) {
  }

  closePopover() {
    this.activityProvider.updateActivity(this.navParams.data.$key, this.name);
    this.viewCtrl.dismiss();
  }

}
