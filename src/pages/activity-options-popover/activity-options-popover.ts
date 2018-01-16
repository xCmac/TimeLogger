import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-activity-options-popover',
  templateUrl: 'activity-options-popover.html',
})
export class ActivityOptionsPopoverPage {

  activities: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              private afDatabase: AngularFireDatabase) {
    this.activities = this.afDatabase.list('/activities').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityOptionsPopoverPage');
  }

  createNewActivity() {

  }

}
