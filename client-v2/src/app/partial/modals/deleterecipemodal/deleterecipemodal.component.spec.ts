import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleterecipemodalComponent } from './deleterecipemodal.component';

describe('DeleterecipemodalComponent', () => {
  let component: DeleterecipemodalComponent;
  let fixture: ComponentFixture<DeleterecipemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleterecipemodalComponent]
    });
    fixture = TestBed.createComponent(DeleterecipemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
