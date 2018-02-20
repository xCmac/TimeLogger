import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { LogProvider } from '../../providers/log/log';
import { Log } from '../../models/log';
import 'rxjs/add/operator/groupBy';
import { ChartDataProvider } from '../../providers/chart-data/chart-data';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  public barChartData: any[];

  constructor(private activityProvider: ActivityProvider, 
              private logProvider: LogProvider,
              private chartDataProvider: ChartDataProvider) {}

  ionViewDidLoad() {
    // this.chartDataProvider.last7DaysLogs.subscribe((logs: Array<Log>) => {
    //   let datesOnly: Array<string> = [];
    //   let sorted: Array<Array<Log>> = [];

    //   let sortedLogs: Object = logs.reduce((logArray: Log[], currentLog: Log) => {
    //     var val = currentLog.activityId
    //     logArray[val] = logArray[val] || [];
    //     logArray[val].push(currentLog);
    //     return logArray;
    //   }, {});

    //   console.log("Sorted weekly logs:", sortedLogs);

    //   let secondSort: Array<any> = [];
    //   Object.keys(sortedLogs).forEach((activity) => {
    //     secondSort.push(sortedLogs[activity].reduce((logArray: Log[], currentLog: Log) => {
    //       var val = currentLog.date.toISOString();
    //       logArray[val] = logArray[val] || [];
    //       logArray[val].push(currentLog);
    //       return logArray;
    //     }, {}));
    //   })

    //   console.log("Second sort: ", secondSort);

    //   for (let index = 7; index >= 0; index--) {
    //     let date: Date = new Date();
    //     date.setDate(date.getDate() - index)
    //     date.setHours(0,0,0,0);
    //     datesOnly.push(date.toISOString());
    //   }

    //   console.log("Dates: ", datesOnly);

    //   datesOnly.forEach((date: string) => {
    //     secondSort.forEach(activity=> {
    //       if(!activity[date]) {
    //         return;
    //       }
    //       console.log(date, activity[date].length);
    //     })
    //   })

    //   var dataArray = [];
    //   secondSort.forEach(activity => {
    //     var data = {
    //       data: [],
    //       label: "a"
    //     };
    //     datesOnly.forEach(date => {
    //       if(activity[date]) {
    //         data.data.push(activity[date].length);
    //       } 
    //       else {
    //         data.data.push(0);
    //       }
    //     });
    //     dataArray.push(data);
    //   });

    //   console.log("Data array: ", dataArray);

    //   this.barChartData = dataArray;
    // });

    // this.chartDataProvider.thisYearsLogs.subscribe((logs: Array<Log>) => {
    //   console.log("This year's logs: ", logs);

    //   let sortedLogs: Object = logs.reduce((logArray: Log[], currentLog: Log) => {
    //     var val = currentLog.activityId;
    //     logArray[val] = logArray[val] || [];
    //     logArray[val].push(currentLog);
    //     return logArray;
    //   }, {});

    //   console.log("Sorted annual logs:", sortedLogs);

    //   this.pieChartLabels = Object.keys(sortedLogs);

    //   let activityCounts: Array<number> = [];
    //   Object.keys(sortedLogs).forEach((activity) => {
    //     activityCounts.push(sortedLogs[activity].length);
    //   })

    //   this.pieChartData = activityCounts;
      
    //   console.log("Pie data: ", this.pieChartLabels, this.pieChartData);
    // })
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
