import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  data = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private userService: UserService,
    private quisService: QuizService
  ) {}

  ngOnInit(): void {
    this.quisService.getDashboard().subscribe(dashboard => {
      const response = dashboard.map((el: any) => ({
        ...el,
        score: JSON.parse(el.score),
        preScore: JSON.parse(el.pre_score),
      }));

      const preScores = response.map((item: any) => item.preScore);
      const scores = response.map((item: any) => item.score);

      const sumPreScore: number[] = Array.from({ length: scores[0].length }, () => 0);
      const sumScore: number[] = Array.from({ length: scores[0].length }, () => 0);

      scores.forEach((item: any) => {
        item.forEach((val: any, i: any) => {
          sumScore[i] += val;
        });
      });
      preScores.forEach((item: any) => {
        item.forEach((val: any, i: any) => {
          sumPreScore[i] += val;
        });
      });

      const averagePreScore = preScores[0].map((_: any, i: any) => preScores?.reduce((acc: any, curr: any) => acc + curr[i], 0) / preScores.length);
      const averageScore = scores[0].map((_: any, i: any) => scores?.reduce((acc: any, curr: any) => acc + curr[i], 0) / scores.length);

      this.data = {
        answers: response,
        averagePreScore: averagePreScore,
        averageScore: averageScore,
      }
  })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches && this.sidenav) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
        this.cdr.detectChanges();
      });
    });
  }

  calculateTotalScore(scores: number[]): number {
    return scores.reduce((total, score) => total + score, 0);
  }

  navigate(path: string): void {
    this.router.navigate(['/admin/dashboard', path], { state: { data: this.data } });
  }

  logout(): void {
    this.userService.logout();
  }
}
