import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeapprovalpreviewComponent } from './recipeapprovalpreview.component';

describe('RecipeapprovalpreviewComponent', () => {
  let component: RecipeapprovalpreviewComponent;
  let fixture: ComponentFixture<RecipeapprovalpreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeapprovalpreviewComponent]
    });
    fixture = TestBed.createComponent(RecipeapprovalpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
