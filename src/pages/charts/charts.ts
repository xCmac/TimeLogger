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
  private barChartLabels: string[] = [];
  private barChartType: string = 'bar';
  private barChartLegend: boolean = true;
  private barChartData: any[];

  private pieChartLabels:string[] = [];
  private pieChartData:number[];
  private pieChartType:string = 'pie';

  constructor(private chartDataProvider: ChartDataProvider) {}

  ionViewDidEnter() {
    this.setupLast7DaysBarChart();
    this.setupThisYearsPieChart();
  }

  private setupLast7DaysBarChart() {
    this.chartDataProvider.getLast7DaysLogs()
      .then(data => {
        let logsSortedByActivity = data.reduce((logArray: Log[], currentLog: Log) => {
          var activityName = currentLog.activity.name
          logArray[activityName] = logArray[activityName] || [];
          logArray[activityName].push(currentLog);
          return logArray;
        }, {})
      
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

  private setupThisYearsPieChart() {
    this.chartDataProvider.getThisYearsLogs()
    .then(data => {
      let sortedLogs = data.reduce((logArray: Log[], currentLog: Log) => {
        var activityName = currentLog.activity.name;
        logArray[activityName] = logArray[activityName] || [];
        logArray[activityName].push(currentLog);
        return logArray;
      }, {});
  
      let labels = [];
      let activityCounts: Array<number> = [];
      Object.keys(sortedLogs).forEach((activity) => {
        labels.push(activity);
        activityCounts.push(sortedLogs[activity].length);
      });
  
      this.pieChartLabels = labels;
      this.pieChartData = activityCounts;
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
