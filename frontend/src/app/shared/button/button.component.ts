import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() color: string;
}
