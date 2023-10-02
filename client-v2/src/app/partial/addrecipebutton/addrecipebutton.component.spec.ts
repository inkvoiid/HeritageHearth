import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecipebuttonComponent } from './addrecipebutton.component';

describe('AddrecipebuttonComponent', () => {
  let component: AddrecipebuttonComponent;
  let fixture: ComponentFixture<AddrecipebuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddrecipebuttonComponent]
    });
    fixture = TestBed.createComponent(AddrecipebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
