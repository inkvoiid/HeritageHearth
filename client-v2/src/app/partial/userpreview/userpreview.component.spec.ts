import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpreviewComponent } from './userpreview.component';

describe('UserpreviewComponent', () => {
  let component: UserpreviewComponent;
  let fixture: ComponentFixture<UserpreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserpreviewComponent]
    });
    fixture = TestBed.createComponent(UserpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
