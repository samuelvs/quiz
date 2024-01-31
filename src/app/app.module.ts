import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OrientationsComponent } from './orientations/orientations.component';
import { TeamComponent } from './team/team.component';
import { PlayerSettingsComponent } from './player-settings/player-settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { LottieModule } from 'ngx-lottie';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrientationsComponent,
    TeamComponent,
    PlayerSettingsComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    LottieModule.forRoot({ player: playerFactory, useWebWorker: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
