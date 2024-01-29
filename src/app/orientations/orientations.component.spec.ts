import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationsComponent } from './orientations.component';

describe('OrientationsComponent', () => {
  let component: OrientationsComponent;
  let fixture: ComponentFixture<OrientationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrientationsComponent]
    });
    fixture = TestBed.createComponent(OrientationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
