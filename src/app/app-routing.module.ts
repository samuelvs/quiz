import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerSettingsComponent } from './player-settings/player-settings.component';
import { OrientationsComponent } from './orientations/orientations.component';
import { TeamComponent } from './team/team.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'orientacoes', component: OrientationsComponent },
  { path: 'equipe', component: TeamComponent },
  { path: 'jogador', component: PlayerSettingsComponent },
  { path: 'quiz', component: QuizComponent },
  // { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
