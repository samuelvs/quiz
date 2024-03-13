import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Chart, { ChartItem } from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';

HighchartsMap(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: any = [];
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
      this.createBarCharResult()
      this.isLoading = false;
    })
  }

  calculateTotalScore(scores: number[]): number {
    return scores.reduce((total, score) => total + score, 0);
  }

  qtdByAge(params: { age?: number }[]): { idade: number, quantidade: number }[] {
    const mapAges = new Map<number, number>();

    params.forEach(param => {
      const age = param.age;
      if (age !== undefined) {
        if (mapAges.has(age)) {
          mapAges.set(age, mapAges.get(age)! + 1);
        } else {
          mapAges.set(age, 1);
        }
      }
    });

    return Array.from(mapAges).map(([idade, quantidade]) => ({ idade, quantidade }));
  }

  createBarCharResult() {
    const quantidadePorIdade = this.qtdByAge(this.dashboard);
    const idades = quantidadePorIdade.map(item => item.idade);
    const quantidades = quantidadePorIdade.map(item => item.quantidade);

    const ctx = document.getElementById('barChartAge') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: idades,
        datasets: [{
          label: 'Quantidade',
          data: quantidades,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Quantidade de respondentes por idade'
          }
        }
      },
    });
  }

  createBarChartSubject() {
    const scores = this.dashboard.map((item: any) => item.scores);
    const sum: number[] = Array.from({ length: scores[0].length }, () => 0);
    scores.forEach((item: any) => {
      item.forEach((val: any, i: any) => {
        sum[i] += val;
      });
    });

    const averageBySubject = scores[0].map((_: any, i: any) => scores?.reduce((acc: any, curr: any) => acc + curr[i], 0) / scores.length);
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
