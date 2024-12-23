import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { OrientationsComponent } from './components/pages/orientations/orientations.component';
import { TeamComponent } from './components/pages/team/team.component';
import { PlayerSettingsComponent } from './components/pages/player-settings/player-settings.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from './components/pages/login/login.component';
import { AverageBySubjectComponent } from './components/pages/admin/dashboard/subject/average-by-subject.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { LottieModule, provideLottieOptions } from 'ngx-lottie';
import { UsersComponent } from './components/pages/admin/users/users.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ButtonComponent } from './shared/button/button.component';
import { ToastrModule } from 'ngx-toastr';
import { ResultComponent } from './components/pages/result/result.component';
import { PreQuizComponent } from './components/pages/pre-quiz/pre-quiz.component';
import { InfoPreQuizComponent } from './components/pages/info-pre-quiz/info-pre-quiz.component';

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
    InfoPreQuizComponent,
    PreQuizComponent,
    QuizComponent,
    LoginComponent,
    ButtonComponent,
    UsersComponent,
    AdminComponent,
    ResultComponent,
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
    MatIconModule,
    MatSidenavModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory, useWebWorker: true }),
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
