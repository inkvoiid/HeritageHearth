import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectrecipemodalComponent } from './rejectrecipemodal.component';

describe('RejectrecipemodalComponent', () => {
  let component: RejectrecipemodalComponent;
  let fixture: ComponentFixture<RejectrecipemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectrecipemodalComponent]
    });
    fixture = TestBed.createComponent(RejectrecipemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
