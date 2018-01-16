import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'day-set',
  templateUrl: 'day-set.html'
})
export class DaySetComponent {

  constructor(private popoverCtrl: PopoverController) {
  }

  showActivityOptionsPopover(event) {
    let popover = this.popoverCtrl.create("ActivityOptionsPopoverPage");
    popover.present({
      ev: event
    });
  }
}
