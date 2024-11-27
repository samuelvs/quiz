import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Chart, { ChartItem } from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';

HighchartsMap(Highcharts);

@Component({
  selector: 'app-average-by-subject',
  templateUrl: './average-by-subject.html',
  styleUrls: ['./average-by-subject.component.scss']
})
export class AverageBySubjectComponent implements OnInit {
  @Input() data = [];
  dashboard: any = [];
  subjects = ['RCP ADULTO E BEBÊ', 'DESENGASGO ADULTO E BEBÊ', 'HEMORRAGIA', 'CONVULSÃO', 'FRATURA'];
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    const navigationState = history.state;
    this.dashboard = navigationState.data;
    this.createBarChartSubject();
  }

  createBarChartSubject() {

    const ctx: ChartItem = document.getElementById('barChartAverageSubject') as HTMLCanvasElement;

    const datasets = [{
      label: 'Assunto',
      data: this.dashboard.averageScore,
      backgroundColor: 'rgba(54, 162, 235, 1)',
      borderColor: 'rgb(35 100 143)',
      borderWidth: 1
    }]

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.subjects,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
        }
      }
    });

    this.isLoading = false;
  }
}
