import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { LogProvider } from '../../providers/log/log';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'day-set',
  templateUrl: 'day-set.html'
})
export class DaySetComponent {
  selectedBlocks: Array<number> = [];

  constructor(private popoverCtrl: PopoverController,
              private logProvider: LogProvider,
              private authProvider: AuthProvider) {
    this.logProvider.getDayLogs(this.authProvider.user.uid);
  }

  showActivityOptionsPopover() {
    let popover = this.popoverCtrl.create("ActivityOptionsPopoverPage", this.selectedBlocks);
    popover.present();
  }

  toggleBlock(event: any) {
    if (event.selected) {
      this.selectedBlocks.push(event.name);
    }
    else {
      let index: number = this.selectedBlocks.indexOf(event.name);
      this.selectedBlocks.splice(index, 1);
    }
  }
}
