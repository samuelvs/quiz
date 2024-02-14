import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PlayerSettingsComponent } from './components/pages/player-settings/player-settings.component';
import { OrientationsComponent } from './components/pages/orientations/orientations.component';
import { TeamComponent } from './components/pages/team/team.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'orientacoes', component: OrientationsComponent },
  { path: 'equipe', component: TeamComponent },
  { path: 'jogador', component: PlayerSettingsComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
