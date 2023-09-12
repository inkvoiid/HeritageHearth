import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserecipepageComponent } from './browserecipepage.component';

describe('BrowserecipepageComponent', () => {
  let component: BrowserecipepageComponent;
  let fixture: ComponentFixture<BrowserecipepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserecipepageComponent]
    });
    fixture = TestBed.createComponent(BrowserecipepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
