import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageBySubjectComponent } from './average-by-subject.component';

describe('AverageBySubjectComponent', () => {
  let component: AverageBySubjectComponent;
  let fixture: ComponentFixture<AverageBySubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AverageBySubjectComponent]
    });
    fixture = TestBed.createComponent(AverageBySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
