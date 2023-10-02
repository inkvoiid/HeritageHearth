import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileheaderComponent } from './mobileheader.component';

describe('MobileheaderComponent', () => {
  let component: MobileheaderComponent;
  let fixture: ComponentFixture<MobileheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileheaderComponent]
    });
    fixture = TestBed.createComponent(MobileheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
