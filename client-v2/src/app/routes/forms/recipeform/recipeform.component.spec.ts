import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeformComponent } from './recipeform.component';

describe('RecipeformComponent', () => {
  let component: RecipeformComponent;
  let fixture: ComponentFixture<RecipeformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeformComponent]
    });
    fixture = TestBed.createComponent(RecipeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
