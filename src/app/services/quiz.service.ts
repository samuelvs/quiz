import { Injectable, NgZone } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { HttpClient } from '@angular/common/http';
import { ANSWERQUESTION, QUESTIONS } from '../shared/urls';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  character: any;
  private score: number[] = [0,0,0,0,0];
  private quiz: any = [];
  private pathStars: number[] = [6,12,18,24];
  private pathIndex: number = 0;
  private currentSubject: number = 0;
  private currentQuestion: number = -1;
  private answerAnimationItem: AnimationItem;
  private bonusAnimationItem: AnimationItem;
  lottieOptions: AnimationOptions = {
    path: '../../assets/animations/starWin.json',
    autoplay: true,
    loop: true,
  };
  isBonus: boolean = false;
  bonusStyles: Partial<CSSStyleDeclaration> = {};
  bonusCollected: boolean = false;

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  loadQuestions(): Observable<boolean> {
    return this.http.get<boolean>(QUESTIONS).pipe(
      map((response: any) => {
        this.quiz = response;
        return response;
      })
    );
  }

  setPlayer(params: any): void {
    this.character = params;
  }

  getNextQuestion() {
    this.pathIndex++;
    if (this.pathStars.includes(this.pathIndex)) {
      this.bonusCollected = false;
      this.isBonus = true;
      this.giftAnimation();
      return;
    }

    this.currentQuestion++;
    const totalQuestions = this.quiz[this.currentSubject].questions.length;
    if (this.currentQuestion > totalQuestions - 1) {
      this.currentSubject++;
      this.currentQuestion = 0;
    }

    return this.getQuestion();
  }

  answer(userAnswer: number): Observable<boolean> {
    const URL = `${ANSWERQUESTION}/${this.currentSubject}/${this.currentQuestion}/${userAnswer}`;
    return this.http.get<boolean>(URL).pipe(
      map((response: boolean) => {
        if (response) {
          this.addScore();
          this.hitAnimation();
        } else {
          this.mistakeAnimmation();
        }
        return response;
      })
    );
  }

  addScore(): void {
    this.score[this.currentSubject]++;
  }

  hasGoodSubject(): boolean {
    return this.score[this.currentSubject] >= 3;
  }

  getQuestion() {
    return this.quiz[this.currentSubject].questions[this.currentQuestion]
  }

  getAnswer(): number {
    return this.quiz[this.currentSubject].questions[this.currentQuestion].answer;
  }

  getPathIndex(): number {
    return this.pathIndex;
  }

  getQuestionNumber(): number {
    const totalSubjects = this.quiz.length;
    return this.currentSubject * totalSubjects + (this.currentQuestion + 1);
  }

  animationAnswerCreated(animationItem: AnimationItem): void {
    this.answerAnimationItem = animationItem;
  }

  animationBonusCreated(animationItem: AnimationItem): void {
    this.bonusAnimationItem = animationItem;
  }

  updateAnimation(configs: any): void {
    this.lottieOptions = {
      ...this.lottieOptions,
      ...configs,
    };
  }

  stopAnimation(): void {
    this.ngZone.runOutsideAngular(() => {
      this.answerAnimationItem?.stop();
      this.bonusAnimationItem?.stop();
    });
  }

  hitAnimation(): void {
    const block = document.getElementById(`block${this.getPathIndex()}`) as HTMLElement;
    block.classList.add('right');
    block?.setAttribute('stroke', '#37B42C');
    const star = document.getElementById(`star${this.getPathIndex()}`) as HTMLElement;
    star.style.display = 'block';

    const audio = new Audio('../../assets/sounds/right.mp3');
    audio.play();

    this.updateAnimation({ path: '../../assets/animations/starWin.json' });
  }

  mistakeAnimmation(): void {
    const block = document.getElementById(`block${this.getPathIndex()}`) as HTMLElement;
    block.classList.add('mistake');
    block?.setAttribute('stroke', '#F23208');
    const star = document.getElementById(`wrong${this.getPathIndex()}`) as HTMLElement;
    star.style.display = 'block';

    const audio = new Audio('../../assets/sounds/wrong.mp3');
    audio.play();

    this.updateAnimation({ path: '../../assets/animations/wrong.json'});
  }

  giftAnimation() {
    const audio = new Audio('../../assets/sounds/right.mp3');
    audio.play();

    this.bonusStyles = { };
    this.updateAnimation({ path: '../../assets/animations/gift.json'});
  }

  bonusAnimation() {
    this.bonusCollected = true;
    const block = document.getElementById(`block${this.getPathIndex()}`) as HTMLElement;
    block.classList.add('right');
    block?.setAttribute('stroke', '#37B42C');

    const audio = new Audio('../../assets/sounds/right.mp3');
    audio.play();

    this.bonusStyles = { width: '80%' };
    this.updateAnimation({ path: '../../assets/animations/bonus.json'});
  }

  selectBlock(): void {
    const block = document.getElementById(`block${this.getPathIndex()}`) as HTMLElement;
    block?.classList.add('selected');
    block?.setAttribute('stroke', `${block.getAttribute('fill')}`);
    const group = document.getElementById('blockGroup');
    group?.appendChild(block);
  }

  unselectBlock(): void {
    const block = document.getElementById(`block${this.getPathIndex()}`) as HTMLElement;
    block?.parentNode?.insertBefore(block, block?.parentNode?.firstChild);
    block?.classList.remove('selected')
    block?.setAttribute('stroke', 'none');
  }
}
