import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Views
import { HomepageComponent } from "./homepage/homepage.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { LoginpageComponent } from './loginpage/loginpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "recipes", component: RecipesComponent },
  { path: "login", component: LoginpageComponent },
  { path: "signup", component: SignuppageComponent },
  { path: "profile/:username", component: ProfilepageComponent},
  { path: "**", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
