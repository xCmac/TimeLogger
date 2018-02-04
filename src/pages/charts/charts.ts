import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { LogProvider } from '../../providers/log/log';
import { Log } from '../../models/log';
import 'rxjs/add/operator/groupBy';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  barChart7DayData: Array<any> = [];
  barChart7DayLabels: Array<any> = [];

  constructor(private activityProvider: ActivityProvider, 
              private logProvider: LogProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartsPage');

    this.logProvider.last7DaysLogs.subscribe((logs: Array<Log>) => {
      let datesOnly: Array<Date> = [];
      let sorted: Array<Array<Log>> = [];

      for (let index = 7; index >= 0; index--) {
        let date: Date = new Date();
        date.setDate(date.getDate() - index)
        date.setHours(0,0,0,0);
        datesOnly.push(date);
      }

      datesOnly.forEach((date: Date) => {
        sorted.push(logs.filter(log => log.date.getDate() == date.getDate() && 
                                        log.date.getMonth() == date.getMonth() && 
                                        log.date.getFullYear() == date.getFullYear())
                                      );
      })
      console.log("SORTED: ", sorted);

      this.barChart7DayLabels = datesOnly.map(date => date.toDateString());
      this.barChart7DayData = sorted.map(sorted => ({
        data: sorted
      }));

      console.log("My linechart data: ", this.barChart7DayData);
    });
  }

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
