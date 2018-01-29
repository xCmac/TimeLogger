import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { Activity } from '../../models/activity';

@IonicPage()
@Component({
  selector: 'page-activity-name-color-editor',
  templateUrl: 'activity-name-color-editor.html',
})
export class ActivityNameColorEditorPage {

  activity: Activity;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private activityProvider: ActivityProvider) {
  }

  ngOnInit() {
    this.activity = this.navParams.data;
  }

  getActivityName(): string {
    return this.activity.name;
  }

  closePopover() {
    this.activityProvider.updateActivity(this.activity);
    this.viewCtrl.dismiss();
  }

  onColorSelect(color: string) {
    this.activity.color = color;
  }
}
