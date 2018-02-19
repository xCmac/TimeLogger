import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { LogProvider } from '../../providers/log/log';
import { TimeBlock } from '../../models/timeblock';
import { Log } from '../../models/log';
import { Activity } from '../../models/activity';

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
      this.logProvider.getLogObservableByBlockNumber(index).subscribe((log: Log) => {
        if (log) {
          this.upsertTimeblock(index, log);
        } else {
          this.upsertTimeblock(index);
        }
      });
    }
  }

  private upsertTimeblock(name: number, log?: Log) {
    let timeBlock: TimeBlock = this.getTimeblock(name);
    if(timeBlock && log) {
      timeBlock.logId = log.id;
      timeBlock.color = log.activity.color;
    } else if (!timeBlock) {
      this.createTimeblock(name, log);
    }
  }

  private createTimeblock(name: number, log?: Log) {
    let timeblock: TimeBlock = {
      logId: log ? log.id : null,
      name: name,
      color: log ? log.activity.color : 'default',
      selected: false
    };
    this.timeBlocks.push(timeblock);
    this.sortTimeblocks();
  }

  private sortTimeblocks() {
    this.timeBlocks.sort((a: TimeBlock, b: TimeBlock) => {
      return a.name - b.name;
    });
  }

  private getTimeblock(blockNumber: number) {
    return this.timeBlocks.find((timeBlock: TimeBlock) => {
      return timeBlock.name == blockNumber;
    });
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

  getSelectedTimeBlocks(): Array<TimeBlock> {
    let selectedBlocks: Array<TimeBlock> = [];
    
    this.timeBlocks.forEach((timeBlock: TimeBlock) => {
      if (timeBlock.selected) {
        selectedBlocks.push(timeBlock);
      }
    });
    return selectedBlocks;
  }

  onSelectedChange(event: any, timeBlock: TimeBlock) {
    timeBlock.selected = event;
  }
}
