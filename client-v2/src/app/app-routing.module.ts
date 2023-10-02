import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// * Views
import { HomepageComponent } from './routes/homepage/homepage.component';
import { LoginpageComponent } from './routes/loginpage/loginpage.component';
import { PagenotfoundComponent } from './routes/pagenotfound/pagenotfound.component';
import { ProfilepageComponent } from './routes/profilepage/profilepage.component';
import { SignuppageComponent } from './routes/forms/signuppage/signuppage.component';
import { RecipeformComponent } from './routes/forms/recipeform/recipeform.component';
import { AuditlogpageComponent } from './routes/auditlogpage/auditlogpage.component';
import { BrowserecipepageComponent } from './routes/browserecipepage/browserecipepage.component';
import { RecipepageComponent } from './routes/recipepage/recipepage.component';

// * Guards
import { isAuthenticatedGuard } from './routeguards/is-authenticated.guard';
import { inverseIsAuthenticatedGuard } from './routeguards/inverse-is-authenticated.guard';
import { isAuthorisedRecipeGuard } from './routeguards/is-authorised-recipe.guard';
import { EditprofileformComponent } from './routes/forms/editprofileform/editprofileform.component';

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
