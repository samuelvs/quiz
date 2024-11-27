import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Chart, { ChartItem } from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';

HighchartsMap(Highcharts);

@Component({
  selector: 'app-comparative',
  templateUrl: './comparative.html',
  styleUrls: ['./comparative.component.scss']
})
export class ComparativeComponent implements OnInit {
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
    const prercentImprove = this.dashboard.averagePreScore.map((score: any, i: any) => {
      const absolute = this.dashboard.averageScore[i] - score;
      return absolute > 0 ? ((absolute/5)*100) : 0;
    });

    const ctx: ChartItem = document.getElementById('barChart') as HTMLCanvasElement;
    const ctxPercent: ChartItem = document.getElementById('barChartPercent') as HTMLCanvasElement;

    const datasets = [
      {
        label: 'Pré-Quiz',
        data: this.dashboard.averagePreScore,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 0.5))',
        borderWidth: 1
      },
      {
        label: 'Quiz',
        data: this.dashboard.averageScore,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgb(35 100 143)',
        borderWidth: 1
      },
      {
        label: 'Limite pré-quiz',
        data: Array(10).fill(2),
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        tension: 0,
        pointRadius: 0,
        type: 'line' as const,
      }
    ];

    const datasetPercent = [
      {
        label: 'Percentual de melhoria utilizando o sistema',
        data: prercentImprove,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 0.5))',
        borderWidth: 1
      },
    ]

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

    new Chart(ctxPercent, {
      type: 'bar',
      data: {
        labels: this.subjects,
        datasets: datasetPercent
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
            },
          },
        }
      }
    });

    this.isLoading = false;
  }
}
