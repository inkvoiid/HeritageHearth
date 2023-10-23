import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteusermodalComponent } from './deleteusermodal.component';

describe('DeleteusermodalComponent', () => {
  let component: DeleteusermodalComponent;
  let fixture: ComponentFixture<DeleteusermodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteusermodalComponent]
    });
    fixture = TestBed.createComponent(DeleteusermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
