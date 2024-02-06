import { Injectable, NgZone } from '@angular/core';
import { questions } from '../../utils/questions';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

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

  constructor(private ngZone: NgZone) {
    this.quiz = questions;
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
    if (this.currentQuestion > 4) {
      this.currentSubject++;
      this.currentQuestion = 0;
    }

    return this.getQuestion();
  }

  answer(playerAns: number): boolean {
    if (playerAns === this.getAnswer()) {
      this.addScore();
      this.hitAnimation();
      return true;
    }
    this.mistakeAnimmation();
    return false;
  }

  addScore(): void {
    this.score[this.currentSubject]++;
  }

  hasGoodSubject(): boolean {
    return this.score[this.currentSubject] >= 3;
  }

  updateAnimation(configs: any): void {
    this.lottieOptions = {
      ...this.lottieOptions,
      ...configs,
    };
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

  animationAnswerCreated(animationItem: AnimationItem): void {
    this.answerAnimationItem = animationItem;
  }

  animationBonusCreated(animationItem: AnimationItem): void {
    this.bonusAnimationItem = animationItem;
  }

  stopAnimation(): void {
    this.ngZone.runOutsideAngular(() => {
      this.answerAnimationItem?.stop();
      this.bonusAnimationItem?.stop();
    });
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
    return this.currentSubject * 5 + (this.currentQuestion + 1);
  }
}
