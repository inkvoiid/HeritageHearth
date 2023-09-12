import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseURL = 'http://localhost:5000/api/recipes';
  username: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();
  }

  getAllRecipes() {
    return this.http.get(`${this.baseURL}`);
  }

  getRecipe(recipeId: string) {
    return this.http.get(`${this.baseURL}/${recipeId}`);
  }

  getUserRecipes(userId: string) {
    
  }

  createNewRecipe(recipe: any) {
    return this.http
      .post(`${this.baseURL}`, recipe, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          if (response.status === 201) {
            this.toastr.success('Recipe created successfully', 'Success');
            this.router.navigate([
              '/recipes/' + recipe.title + 'by' + this.username,
            ]);
          } else {
            this.toastr.error(response.status, 'An error occurred');
          }
        })
      );
  }

  createRecipeError(error: any): void {
    const errorMessage = (error as any)?.error?.message || 'An error occurred'; // Use type assertion

    if (errorMessage === 'Unauthorised') {
      this.toastr.error(
        'Please check your username or password and try again',
        'Invalid credentials'
      );
    } else {
      this.toastr.error(errorMessage, 'An error occurred');
    }

    console.error(error);
  }
}
