import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { school } from 'src/utils/school';
import { places } from 'src/utils/places';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';
import { CharacterTypeEnum } from 'src/interfaces/character.enum';

@Component({
  selector: 'app-info-pre-quiz',
  templateUrl: './info-pre-quiz.component.html',
  styleUrls: ['./info-pre-quiz.component.scss']
})
export class InfoPreQuizComponent {

  constructor(private route: Router) { }

  startPreQuiz(): void {
    this.route.navigate(['/pre-quiz']);
  }
}
