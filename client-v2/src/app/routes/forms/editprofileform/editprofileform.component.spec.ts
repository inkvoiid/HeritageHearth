import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileformComponent } from './editprofileform.component';

describe('EditprofileformComponent', () => {
  let component: EditprofileformComponent;
  let fixture: ComponentFixture<EditprofileformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprofileformComponent]
    });
    fixture = TestBed.createComponent(EditprofileformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
