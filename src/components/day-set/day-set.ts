import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { LogProvider } from '../../providers/log/log';
import { TimeBlock } from '../../models/timeblock';

@Component({
  selector: 'day-set',
  templateUrl: 'day-set.html'
})

export class DaySetComponent {
  selectedBlocks: Array<number> = [];
  timeBlocks: Array<TimeBlock> = [];

  constructor(private popoverCtrl: PopoverController,
              private logProvider: LogProvider) {
  }

  ngOnInit() {
    this.createTimeblocks(24);
  }

  private createTimeblocks(numberOfTimeBlocks: number) {
    for (let index = 1; index <= numberOfTimeBlocks; index++) {
      let timeblock: TimeBlock = {
        name: index,
        color: this.logProvider.logs.map(log => +log.blockNumber).indexOf(index) > -1 ? 'secondary' : 'default'
      };

      this.timeBlocks.push(timeblock);
    }
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
