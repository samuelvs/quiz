import { Component, NgZone } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-pre-quiz',
  templateUrl: './pre-quiz.component.html',
  styleUrls: ['./pre-quiz.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(0, style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('500ms ease-in', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'scale(0)' })),
      ]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }), // Inicia oculto à direita
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })), // Movendo para a esquerda
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0, transform: 'translateY(100%)' })), // Movendo para baixo
      ]),
    ]),
  ],
})
export class PreQuizComponent {
  question: any;
  alternativeSelected: number|null = null;
  isRight: boolean|null = null;

  constructor(protected quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.loadPreQuizQuestions().subscribe(() => {
      this.next();
    })
  }

  selectAlternative(index: number): void {
    if (this.isRight === null) {
      this.alternativeSelected = index;
    }
  }

  answer(): void {
    if (this.alternativeSelected != null) {
      this.quizService.answerPreQuiz(this.alternativeSelected).subscribe((result) => {
        this.isRight = result;
      });
    }
  }

  next(): void {
    this.alternativeSelected = null;
    this.isRight = null;
    this.question = this.quizService.getNextQuestionPreQuiz();
    this.quizService.stopAnimation();
  }
}
