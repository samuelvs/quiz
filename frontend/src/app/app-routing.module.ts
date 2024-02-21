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
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/pages/admin/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'orientacoes', component: OrientationsComponent },
  { path: 'equipe', component: TeamComponent },
  { path: 'jogador', component: PlayerSettingsComponent },
  { path: 'quiz', component: QuizComponent, canActivate:[QuizGuard] },
  { path: 'resultado', component: ResultComponent, canActivate:[QuizGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard],
    children: [
      { path: 'dashboard',  component: DashboardComponent },
      { path: 'usuarios',  component: UsersComponent },
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
