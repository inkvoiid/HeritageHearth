import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// * Views
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { RecipeformComponent } from './recipeform/recipeform.component';
import { AuditlogpageComponent } from './auditlogpage/auditlogpage.component';
import { BrowserecipepageComponent } from './browserecipepage/browserecipepage.component';
import { RecipepageComponent } from './recipepage/recipepage.component';

// * Guards
import { isAuthenticatedGuard } from './is-authenticated.guard';
import { inverseIsAuthenticatedGuard } from './inverse-is-authenticated.guard';
import { isAuthorisedRecipeGuard } from './is-authorised-recipe.guard';
import { EditprofileformComponent } from './editprofileform/editprofileform.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'recipes', component: BrowserecipepageComponent },
  {
    path: 'recipes/add',
    component: RecipeformComponent,
    canActivate: [isAuthenticatedGuard],
  },
  { path: 'recipes/:recipeId', component: RecipepageComponent },
  {
    path: 'recipes/:recipeId/edit',
    component: RecipeformComponent,
    canActivate: [isAuthorisedRecipeGuard, isAuthenticatedGuard],
  },
  { path: 'logs', component: AuditlogpageComponent },
  {
    path: 'login',
    component: LoginpageComponent,
    canActivate: [inverseIsAuthenticatedGuard],
  },
  {
    path: 'signup',
    component: SignuppageComponent,
    canActivate: [inverseIsAuthenticatedGuard],
  },
  { path: 'profile/:username', component: ProfilepageComponent },
  { path: 'profile/:username/edit', component: EditprofileformComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
