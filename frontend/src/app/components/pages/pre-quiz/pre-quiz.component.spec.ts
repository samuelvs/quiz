import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreQuizComponent } from './pre-quiz.component';

describe('PreQuizComponent', () => {
  let component: PreQuizComponent;
  let fixture: ComponentFixture<PreQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreQuizComponent]
    });
    fixture = TestBed.createComponent(PreQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
