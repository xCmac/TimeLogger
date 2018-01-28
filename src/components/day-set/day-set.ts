import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { LogProvider } from '../../providers/log/log';
import { TimeBlock } from '../../models/timeblock';
import { Log } from '../../models/log';

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
      this.logProvider.getLogObservableByBlockNumber(index).subscribe(log => {
        let timeblock: TimeBlock = {
          logId: log ? log.id : null,
          name: index,
          color: log ? log.activity.color : 'default',
          selected: false
        };
  
        this.timeBlocks.push(timeblock);
      });
    }
  }

  // private getLogByBlockNumber(blockNumber: number): any {
  //   let logReturned: Log = null;

  //   this.logProvider.getLogObservableByBlockNumber(blockNumber).subscribe(log => {
  //     if (!log) {
  //       return;
  //     }

  //     logReturned = {
  //       id: log.id,
  //       userId: log.userId,
  //       date: log.date,
  //       activity: log.activity,
  //       blockNumber: log.blockNumber
  //     }
  //   });

  //   return logReturned;
  // }

  updateTimeBlockColors() {
    // this.timeBlocks.forEach((timeBlock: TimeBlock) => {
    //   let currentLog: Log = this.getLogByBlockNumber(timeBlock.name);
    //   if(currentLog) {
    //     timeBlock.color = currentLog.activity.color;
    //   }
    // })
  }

  showActivityOptionsPopover() {
    let popover = this.popoverCtrl.create("ActivityOptionsPopoverPage", this.getSelectedTimeBlocks());
    popover.present();
    popover.onDidDismiss(() => {
      this.timeBlocks.forEach((timeBlock: TimeBlock) => {
        timeBlock.selected = false;
      });
      this.updateTimeBlockColors();
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
