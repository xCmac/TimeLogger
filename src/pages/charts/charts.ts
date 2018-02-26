import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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

  constructor(private chartDataProvider: ChartDataProvider) {}

  ionViewDidLoad() {
    this.setupLast7DaysBarChart();

    this.chartDataProvider.thisYearsLogs.subscribe((logs: Array<Log>) => {
      console.log("This year's logs: ", logs);

      let sortedLogs: Object = logs.reduce((logArray: Log[], currentLog: Log) => {
        var activityName = currentLog.activity.name;
        logArray[activityName] = logArray[activityName] || [];
        logArray[activityName].push(currentLog);
        return logArray;
      }, {});

      console.log("Sorted annual logs:", sortedLogs);

      this.pieChartLabels = Object.keys(sortedLogs);

      let activityCounts: Array<number> = [];
      Object.keys(sortedLogs).forEach((activity) => {
        activityCounts.push(sortedLogs[activity].length);
      })

      this.pieChartData = activityCounts;
      
      console.log("Pie data: ", this.pieChartLabels, this.pieChartData);
    })
  }

  private setupLast7DaysBarChart() {
    this.chartDataProvider.last7DaysLogs.subscribe((logs: Array<Log>) => {
      let logsSortedByActivity: Object = logs.reduce((logArray: Log[], currentLog: Log) => {
        var activityName = currentLog.activity.name
        logArray[activityName] = logArray[activityName] || [];
        logArray[activityName].push(currentLog);
        return logArray;
      }, {});

      let activities = Object.keys(logsSortedByActivity);

      let logsSortedByActivityByDate: Array<any> = [];
      Object.keys(logsSortedByActivity).forEach((activity) => {
        logsSortedByActivityByDate.push(logsSortedByActivity[activity].reduce((logArray: Log[], currentLog: Log) => {
          var date = currentLog.date.toLocaleDateString();
          logArray[date] = logArray[date] || [];
          logArray[date].push(currentLog);
          return logArray;
        }, {}));
      })

      let datesOnly: Array<string> = [];
      for (let index = 7; index >= 0; index--) {
        let date: Date = new Date();
        date.setDate(date.getDate() - index)
        date.setHours(0, 0, 0, 0);
        datesOnly.push(date.toLocaleDateString());
      }

      this.barChartLabels = datesOnly;

      var sevenDayDataArray = [];
      logsSortedByActivityByDate.forEach((activityLogsByDate, index) => {
        var activityData = {
          data: [],
          label: activities[index]
        };
        datesOnly.forEach(date => {
          if (activityLogsByDate[date]) {
            activityData.data.push(activityLogsByDate[date].length);
          }
          else {
            activityData.data.push(0);
          }
        });
        sevenDayDataArray.push(activityData);
      });

      this.barChartData = sevenDayDataArray;
    });
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
