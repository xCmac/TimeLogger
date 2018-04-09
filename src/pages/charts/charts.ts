import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Log } from '../../models/log';
import { Pixel } from '../../models/pixel';
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
  private barChartColors: any[] = [];

  private pieChartLabels: string[] = [];
  private pieChartData: number[];
  private pieChartType: string = 'pie';
  private pieChartColors: any[] = [{ backgroundColor:[] }];

  private yearInPixelData: Pixel[] = [];

  constructor(private chartDataProvider: ChartDataProvider) {}

  ionViewDidEnter() {
    this.setupLast7DaysBarChart();
    this.setupThisYearsPieChart();
    this.setupYearInPixels();
  }

  private setupLast7DaysBarChart() {
    this.chartDataProvider.getLast7DaysLogs()
      .then(data => {
        let colors = {};

        let logsSortedByActivity = data.reduce((logArray: Log[], currentLog: Log) => {
          var activityName = currentLog.activity.name;
          colors[activityName] = currentLog.activity.color;
          logArray[activityName] = logArray[activityName] || [];
          logArray[activityName].push(currentLog);
          return logArray;
        }, {});

        Object.keys(colors).forEach((activity: string) => {
          this.barChartColors.push({
            backgroundColor: this.getColor(colors[activity]),
            borderColor: this.getColor(colors[activity])
          });
        })

        let activities = Object.keys(logsSortedByActivity);

        let logsSortedByActivityByDate: Array<any> = [];
        Object.keys(logsSortedByActivity).forEach((activity) => {
          logsSortedByActivityByDate.push(logsSortedByActivity[activity].reduce((logArray: Log[], currentLog: Log) => {
            var date = currentLog.date.toLocaleDateString();
            logArray[date] = logArray[date] || [];
            logArray[date].push(currentLog);
            return logArray;
          }, {}));
        });

        let datesOnly: Array<string> = [];
        for (let index = 7; index >= 0; index--) {
          let date: Date = new Date();
          date.setDate(date.getDate() - index);
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
      let colors = {};

      let sortedLogs = data.reduce((logArray: Log[], currentLog: Log) => {
        var activityName = currentLog.activity.name;
        colors[activityName] = currentLog.activity.color;
        logArray[activityName] = logArray[activityName] || [];
        logArray[activityName].push(currentLog);
        return logArray;
      }, {});

      Object.keys(colors).forEach((activity: string) => {
        this.pieChartColors[0].backgroundColor.push(this.getColor(colors[activity]));
      });
  
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

  private getColor(colorString: string) {
    let colors = {
      red: "#F44336",
      pink: "#E91E63",
      purple: "#9C27B0",
      deepPurple: "#673AB7",
      indigo: "#3F51B5",
      blue: "#2196F3",
      lightBlue: "#03A9F4",
      cyan: "#00BCD4",
      teal: "#009688",
      green: "#4CAF50",
      lightGreen: "#8BC34A",
      lime: "#CDDC39",
      yellow: "#FFEB3B",
      amber: "#FFC107",
      orange: "#FF9800",
      deepOrange: "#FF5722",
      brown: "#795548",
      grey: "#9E9E9E", 
      blueGrey: "#607D8B",
      black: "#222"
    };

    return colors[colorString];
  }

  private setupYearInPixels() {
    this.chartDataProvider.getYearInPixelsLogs()
    .then(logs => {
      let data: Pixel[] = logs.map(log => ({
        activity: log.activity.name,
        color: log.activity.color,
        date: log.date,
        hour: log.blockNumber
      }));
      // this.yearInPixelData = data;
      console.log("Pixel Data: ", data);
      return data;
    })
    .then(logs => {
      this.createPixels(logs);
    });
  }

  private createPixels(logs: Pixel[]) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let currentDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
    
    while (currentDate.getTime() != today.getTime()) {
      for (let hour = 1; hour < 25; hour++) {
        let currentLog = logs.find(log => {
          return (log.date.getTime() == currentDate.getTime() && log.hour == hour)
        });

        if(currentLog) {
          this.yearInPixelData.push(currentLog);
        }
        else {
          this.yearInPixelData.push({
            activity: "",
            color: "#FFFFFF",
            date: currentDate,
            hour: hour
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
