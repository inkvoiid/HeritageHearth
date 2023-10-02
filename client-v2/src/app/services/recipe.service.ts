import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import slugify from 'slugify';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseURL = '/api/recipes';
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
    return this.http.get(`${this.baseURL}/${recipeId}`, {
      observe: 'response',
    });
  }

  getUserRecipes(userId: string) {}

  createNewRecipe(creator: string, recipe: any) {
    return this.http
      .post(`${this.baseURL}`, recipe, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          if (response.status === 201) {
            this.toastr.success('Recipe created successfully', 'Success');
            this.router.navigate([
              '/recipes/' +
                slugify(recipe.name + ' by ' + creator, { lower: true }),
            ]);
          } else {
            this.toastr.error(response.status, 'An error occurred');
          }
        })
      );
  }

  updateRecipe(recipeId: string, recipe: any) {
    console.log(recipe);
    return this.http
      .put(`${this.baseURL}/${recipeId}`, recipe, { observe: 'response' })
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.toastr.success('Recipe updated successfully', 'Success');
            this.router.navigate(['/recipes/' + recipeId]);
          } else {
            this.toastr.error(response.status, 'An error occurred');
          }
        })
      );
  }

  deleteRecipe(recipeId: string) {
    return this.http
      .delete(`${this.baseURL}/${recipeId}`, {
        observe: 'response',
      })
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.toastr.success('Recipe deleted successfully', 'Success');
            this.router.navigate(['/recipes']);
          } else {
            this.toastr.error(response.status, 'An error occurred');
          }
        })
      );
  }

  showError(error: any): void {
    const errorMessage = (error as any)?.error?.message || 'An error occurred'; // Use type assertion

    this.toastr.error(errorMessage, 'Error');

    console.error(error);
  }
}
