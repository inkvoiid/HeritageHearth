import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import slugify from 'slugify';
import { AuthService } from './auth.service';

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
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername();
  }

  getAllRecipes(showPending: boolean = false) {
    let url = `${this.baseURL}/previews`;
    if (showPending) {
      url += '?showPending=true';
    }
    return this.http.get(url);
  }

  getAllPendingRecipes() {
    let url = `${this.baseURL}/pending`;

    return this.http.get(url);
  }

  getLatestRecipes(showPending: boolean = false) {
    let url = `${this.baseURL}/latest`;
    if (showPending) {
      url += '?showPending=true';
    }
    return this.http.get(url);
  }

  getRecipe(recipeId: string) {
    return this.http.get(`${this.baseURL}/${recipeId}`, {
      observe: 'response',
    });
  }

  getUserRecipes(userId: string, showPending: boolean = false) {
    let url = `${this.baseURL}/previews?creator=${userId}`;
    if (showPending) {
      url += '&showPending=true';
    }
    return this.http.get(url);
  }

  createNewRecipe(creator: string, recipe: any) {
    // If the current user is the creator, incase an admin is editing a recipe
    if (recipe.creator === this.auth.getUsername()) {
      this.toastr.info("You're the creator of this recipe", 'Info');
      this.userService
        .getUser(this.auth.getUsername(), true)
        .subscribe((response: any) => {
          if (response.status === 200) {
            // If the user is an admin or verified, automatically approve the recipe
            this.toastr.info("You're an admin or verified user", 'Info');
            if (
              response.body.roles.includes('admin') ||
              response.body.roles.includes('verified')
            ) {
              this.toastr.info('Recipe approved automatically', 'Info');
              recipe.approved = true;
            }
          }
        });
    }
    console.log(recipe);
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

  approveRecipe(recipeId: string): boolean {
    this.getRecipe(recipeId).subscribe((getResponse: any) => {
      if (getResponse.status === 200) {
        getResponse.body.approved = true;
        console.log(getResponse.body);
        this.http
          .put(`${this.baseURL}/${recipeId}`, getResponse.body, {
            observe: 'response',
          })
          .subscribe((response: any) => {
            if (response.status === 200) {
              this.toastr.success(
                'Recipe approved successfully',
                'Recipe Approved'
              );
            } else {
              this.toastr.error(response.status, 'Error');
            }
          });
      }
    });
    return false;
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

  rejectRecipe(recipeId: string, redirect: boolean = false) {
    return this.http
      .delete(`${this.baseURL}/${recipeId}`, {
        observe: 'response',
      })
      .pipe(
        tap((response: any) => {
          if (response.status === 200) {
            this.toastr.success(
              'Recipe deleted successfully',
              'Recipe Rejected'
            );
            if (redirect) {
              this.router.navigate(['/recipes']);
            }
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
