import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Chart, { ChartItem } from 'chart.js/auto';
import * as Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';

HighchartsMap(Highcharts);

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {
  @Input() data = [];
  dashboard: any = [];
  subjects = ['RCP ADULTO E BEBÊ', 'DESENGASGO ADULTO E BEBÊ', 'HEMORRAGIA', 'CONVULSÃO', 'FRATURA'];
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    const navigationState = history.state;
    this.dashboard = navigationState.data;
    this.createBarCharResult()
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
    const quantidadePorIdade = this.qtdByAge(this.dashboard.answers);
    const idades = quantidadePorIdade.map(item => item.idade);
    const quantidades = quantidadePorIdade.map(item => item.quantidade);

    const ctx = document.getElementById('barChartAge') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: idades,
        datasets: [{
          label: 'Quantidade',
          data: quantidades,
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
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
        }
      },
    });
  }
}
