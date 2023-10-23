import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashpageComponent } from './admindashpage.component';

describe('AdmindashpageComponent', () => {
  let component: AdmindashpageComponent;
  let fixture: ComponentFixture<AdmindashpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindashpageComponent]
    });
    fixture = TestBed.createComponent(AdmindashpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
