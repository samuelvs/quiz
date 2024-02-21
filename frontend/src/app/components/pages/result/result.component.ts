import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  showResult: boolean = false;
  name: string = '';
  score: number = 0;

  constructor(protected quizService: QuizService) {}

  ngOnInit(): void {
    this.name = this.quizService.player.name.split(' ')[0];
    this.score = this.quizService.getScore();
    this.quizService.reset();
    setTimeout(() => {
      this.showResult = true;
    }, 2000);
  }
}
