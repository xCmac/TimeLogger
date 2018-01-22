import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { LogProvider } from '../../providers/log/log';
import { TimeBlock } from '../../models/timeblock';

@Component({
  selector: 'day-set',
  templateUrl: 'day-set.html'
})

export class DaySetComponent {
  timeBlocks: Array<TimeBlock> = [];

  constructor(private popoverCtrl: PopoverController,
              private logProvider: LogProvider) {
  }

  ngOnInit() {
    this.createTimeblocks(24);
  }

  private createTimeblocks(numberOfTimeBlocks: number) {
    for (let index = 1; index <= numberOfTimeBlocks; index++) {
      let logIndex: number = this.logProvider.logs.map(log => +log.blockNumber).indexOf(index);

      let timeblock: TimeBlock = {
        name: index,
        color: logIndex > -1 ? this.logProvider.logs[logIndex].activity.color : 'default',
        selected: false
      };

      this.timeBlocks.push(timeblock);
    }
  }

  showActivityOptionsPopover() {
    let popover = this.popoverCtrl.create("ActivityOptionsPopoverPage", this.getSelectedTimeBlocks());
    popover.present();
    popover.onDidDismiss(() => {
      this.timeBlocks.forEach((timeBlock: TimeBlock) => {
        timeBlock.selected = false;
      });
    });
  }

  getSelectedTimeBlocks(): Array<number> {
    let selectedBlocks: Array<number> = [];
    
    this.timeBlocks.forEach((timeBlock: TimeBlock) => {
      if (timeBlock.selected) {
        selectedBlocks.push(timeBlock.name);
      }
    });

    return selectedBlocks;
  }

  onSelectedChange(event: any, timeBlock: TimeBlock) {
    timeBlock.selected = event;
  }
}
