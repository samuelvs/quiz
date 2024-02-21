import { Injectable, NgZone } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { HttpClient } from '@angular/common/http';
import { ANSWERQUESTION, DASHBOARD, FINALIZE_QUIZ, QUESTIONS } from '../shared/constants/urls';
import { Observable, map, tap } from 'rxjs';
import { Character } from '../shared/interfaces/character.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  player: Character;
  private score: number[] = [0,0,0,0,0];
  private quiz: any = [];
  private pathStars: number[] = [6,12,18,24,30];
  private pathIndex: number = 0;
  private finalPath: number = 30;
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
  isLoadingResult: boolean = false;

  constructor(private ngZone: NgZone, private http: HttpClient, private router: Router, private toastrService:ToastrService) {}

  loadQuestions(): Observable<boolean> {
    return this.http.get<boolean>(QUESTIONS).pipe(
      map((response: any) => {
        this.quiz = response;
        return response;
      })
    );
  }

  setPlayer(params: any): void {
    this.player = params;
  }

  getNextQuestion() {
    if (this.pathIndex === this.finalPath) {
      this.isLoadingResult = true;
      this.finish().subscribe(res => {
        this.router.navigate(['/resultado']);
      });
    }

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
    const params = {
      subject: this.currentSubject,
      question: this.currentQuestion,
      userAnswer: userAnswer
    };
    return this.http.post<boolean>(ANSWERQUESTION, params).pipe(
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

  finish(): Observable<any> {
    const params = {
      ...this.player,
      score: JSON.stringify(this.score)
    };

    return this.http.post(FINALIZE_QUIZ, params);
  }

  getScore(): number {
    const sum = this.score.reduce((acc, curr) => acc + curr, 0);
    return sum;
  }

  reset() {
    this.setPlayer({});
    this.score = [0,0,0,0,0];
    this.pathIndex = 0;
    this.currentSubject = 0;
    this.currentQuestion = -1;
    this.isBonus = false;
    this.bonusCollected = false;
    this.isLoadingResult = false;
  }

  getDashboard(): Observable<any> {
    return this.http.get(DASHBOARD).pipe(
      tap({
        next: (dashboard: any) =>{
          return dashboard;
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Algo deu errado:');
        }
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
    if (!this.bonusCollected) {
      this.addScore();
      this.bonusCollected = true;
    }
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
    block?.classList?.add('selected');
    block?.setAttribute('stroke', `${block.getAttribute('fill')}`);
    const group = document.getElementById('blockGroup');
    group?.appendChild(block);
  }

  unselectBlock(): void {
    const block = document?.getElementById(`block${this.getPathIndex()}`) as HTMLElement;
    block?.parentNode?.insertBefore(block, block?.parentNode?.firstChild);
    block?.classList?.remove('selected');
    block?.setAttribute('stroke', 'none');
  }
}
