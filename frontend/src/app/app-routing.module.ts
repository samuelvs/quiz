import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PlayerSettingsComponent } from './components/pages/player-settings/player-settings.component';
import { OrientationsComponent } from './components/pages/orientations/orientations.component';
import { TeamComponent } from './components/pages/team/team.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { QuizGuard } from './auth/guards/quiz.guard';
import { ResultComponent } from './components/pages/result/result.component';
import { AverageBySubjectComponent } from './components/pages/admin/dashboard/subject/average-by-subject.component';
import { UsersComponent } from './components/pages/admin/users/users.component';
import { PreQuizComponent } from './components/pages/pre-quiz/pre-quiz.component';
import { AgeComponent } from './components/pages/admin/dashboard/age/age.component';
import { ComparativeComponent } from './components/pages/admin/dashboard/comparative/comparative.component';
import { InfoPreQuizComponent } from './components/pages/info-pre-quiz/info-pre-quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipe', component: TeamComponent },
  { path: 'jogador', component: PlayerSettingsComponent },
  { path: 'info-pre-quiz', component: InfoPreQuizComponent, canActivate:[QuizGuard] },
  { path: 'pre-quiz', component: PreQuizComponent, canActivate:[QuizGuard] },
  { path: 'orientacoes', component: OrientationsComponent },
  { path: 'quiz', component: QuizComponent, canActivate:[QuizGuard] },
  { path: 'resultado', component: ResultComponent, canActivate:[QuizGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        children: [
          { path: 'media-assunto',  component: AverageBySubjectComponent },
          { path: 'idade',  component: AgeComponent },
          { path: 'evolucao-aprendizado',  component: ComparativeComponent },
        ]
      },
      { path: 'usuarios',  component: UsersComponent },
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
