import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeService } from '../../services/recipe.service';
import { fader, listAnimation } from 'src/app/animations';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: [
    './profilepage.component.css',
    '../../../assets/styles/profilethemes.css',
  ],
  animations: [listAnimation, fader],
})
export class ProfilepageComponent implements OnInit {
  username: string = '';
  user: any;
  allRecipes: any = [];
  pendingRecipes: any = [];
  recipes: any = [];
  loading: boolean = true;
  isOwnProfile: boolean = false;
  userProfilePic: string = 'egg_blue.jpg';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    protected userService: UserService,
    protected auth: AuthService,
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
    this.userService.getUser(username).subscribe(
      (response: any) => {
        this.user = response.body;
        this.userProfilePic = this.user.profilePic;
        this.loading = false;
        if (this.auth.getUsername() === this.user.username) {
          this.isOwnProfile = true;
        } else {
          this.isOwnProfile = false;
        }
        this.recipeService
          .getUserRecipes(this.user.username, true)
          .subscribe((recipes) => {
            this.allRecipes = recipes;

            for (let recipe of this.allRecipes) {
              if (recipe.approved === false) {
                this.pendingRecipes.push(recipe);
              } else {
                this.recipes.push(recipe);
              }
            }
          });
      },
      (error) => {
        this.user = null;
        this.loading = false;
      }
    );
  }

  loadPlaceholderImage() {
    this.userProfilePic = 'egg_blue.jpg';
  }
}
