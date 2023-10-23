import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  users: any;
  latestrecipes: any = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private RecipeService: RecipeService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.getAllUsers(true).subscribe((response: any) => {
        this.users = response.body;
      });
    });

    this.getLatestRecipes();
  }

  getLatestRecipes() {
    this.RecipeService.getLatestRecipes().subscribe((response: any) => {
      this.latestrecipes = response;
    });
  }
}
