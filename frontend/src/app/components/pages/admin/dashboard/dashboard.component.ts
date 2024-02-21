import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
// import * as Chart from 'chart.js';
// import * as Chart from 'chart.js/auto'; // Use 'chart.js/auto' em vez de apenas 'chart.js'
import Chart, { ChartItem } from 'chart.js/auto';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard = [];
  subjects = ['RCP ADULTO E BEBÊ', 'DESENGASGO ADULTO E BEBÊ', 'HEMORRAGIA', 'CONVULSÃO', 'FRATURA'];
  isLoading: boolean = false;

  constructor(private quisService: QuizService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.quisService.getDashboard().subscribe(dashboard => {
      this.dashboard = dashboard.map((el: any) => ({
        ...el,
        scores: JSON.parse(el.score),
        totalScore: this.calculateTotalScore(JSON.parse(el.score))
    }));
      this.createBarChartSubject();
      this.isLoading = false;
    })
  }

  calculateTotalScore(scores: number[]): number {
    return scores.reduce((total, score) => total + score, 0);
  }

  createBarChartSubject() {
    const scores = this.dashboard.map((item: any) => item.scores);
    const sum: number[] = Array.from({ length: scores[0].length }, () => 0);
    scores.forEach(item => {
      item.forEach((val: any, i: any) => {
        sum[i] += val;
      });
    });

    const averageBySubject = scores[0].map((_: any, i: any) => scores?.reduce((acc, curr) => acc + curr[i], 0) / scores.length);
    const ctx: ChartItem = document.getElementById('barChart') as HTMLCanvasElement;

    const datasets = [{
      label: 'Média de Pontuação por Assunto',
      data: averageBySubject,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
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
          // y: [{
          //   ticks: {
          //     beginAtZero: true
          //   }
          // }]
        }
      }
    });
  }
}
