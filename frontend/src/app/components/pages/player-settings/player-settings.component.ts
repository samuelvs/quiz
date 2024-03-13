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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-player-settings',
  templateUrl: './player-settings.component.html',
  styleUrls: ['./player-settings.component.scss']
})
export class PlayerSettingsComponent {
  schoolArray = school;
  stateArray = places;
  matcher = new MyErrorStateMatcher();
  playerForm: FormGroup;
  CharacterTypeEnum = CharacterTypeEnum;

  constructor(private fb: FormBuilder, private quiz: QuizService, private route: Router) { }

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required]],
      age: [null, [Validators.required]],
      school: [{}, [Validators.required]],
      year: ['', []],
      state: [{}, [Validators.required]],
      city: ['', [Validators.required]],
      character: ['', [Validators.required]],
    });
  }

  chooseCharacter(character: any): void {
    this.playerForm.get('character')?.setValue(character);
  }

  onSubmit(): void {
    let params = this.playerForm.getRawValue();
    params.school = params.school.name;
    params.state = params.state.name;
    this.quiz.setPlayer(params);
    this.route.navigate(['/quiz']);
  }
}
