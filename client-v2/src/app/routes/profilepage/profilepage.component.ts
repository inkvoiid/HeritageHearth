import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  username: string = '';
  user: any;
  recipes: any = [];
  loading: boolean = true;
  isOwnProfile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.username = params['username'];
        this.getUserData(this.username);
      }
      // this.recipeService.getUserRecipes(userId).subscribe((recipes) => {
      // this.recipes = recipes;
    );
  }

  getUserData(username: string) {
    this.userService.getUser(username).subscribe((response: any) => {
      this.user = response.body;
      this.loading = false;
      if (this.userService.getUsername() === this.user.username) {
        this.isOwnProfile = true;
      } else {
        this.isOwnProfile = false;
      }
      response.body.recipes.forEach((recipe: any) => {
        this.recipeService.getRecipe(recipe).subscribe((recipe) => {
          if (this.recipes) {
            this.recipes.push(recipe.body);
          } else {
            this.recipes = [recipe.body];
          }
        });
      });
    });
  }
}
