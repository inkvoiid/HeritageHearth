import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// * Views
import { HomepageComponent } from './routes/homepage/homepage.component';
import { LoginpageComponent } from './routes/loginpage/loginpage.component';
import { PagenotfoundComponent } from './routes/pagenotfound/pagenotfound.component';
import { ProfilepageComponent } from './routes/profilepage/profilepage.component';
import { EditprofileformComponent } from './routes/forms/editprofileform/editprofileform.component';
import { SignuppageComponent } from './routes/forms/signuppage/signuppage.component';
import { RecipeformComponent } from './routes/forms/recipeform/recipeform.component';
import { AdmindashpageComponent } from './routes/admindashpage/admindashpage.component';
import { AuditlogpageComponent } from './routes/auditlogpage/auditlogpage.component';
import { BrowserecipepageComponent } from './routes/browserecipepage/browserecipepage.component';
import { RecipepageComponent } from './routes/recipepage/recipepage.component';

// * Guards
import { isAuthenticatedGuard } from './routeguards/is-authenticated.guard';
import { inverseIsAuthenticatedGuard } from './routeguards/inverse-is-authenticated.guard';
import { isAuthorisedRecipeGuard } from './routeguards/is-authorised-recipe.guard';
import { isAdminGuard } from './routeguards/is-admin.guard';

// * Resolvers
import { adminstatusResolver } from './resolvers/adminstatus.resolver';

const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home - Our Kitchen' },
  {
    path: 'recipes',
    component: BrowserecipepageComponent,
    title: 'Browse Recipes - Our Kitchen',
  },
  {
    path: 'recipes/add',
    component: RecipeformComponent,
    title: 'Add Recipe - Our Kitchen',
    canActivate: [isAuthenticatedGuard],
  },
  { path: 'recipes/:recipeId', component: RecipepageComponent },
  {
    path: 'recipes/:recipeId/edit',
    component: RecipeformComponent,
    canActivate: [isAuthorisedRecipeGuard, isAuthenticatedGuard],
  },
  {
    path: 'admin',
    component: AdmindashpageComponent,
    title: 'Admin Dashboard - Our Kitchen',
    resolve: { adminStatus: adminstatusResolver },
    canActivate: [isAdminGuard],
  },
  {
    path: 'logs',
    component: AuditlogpageComponent,
    title: 'Audit Log - Our Kitchen',
    resolve: { adminStatus: adminstatusResolver },
    canActivate: [isAdminGuard],
  },
  {
    path: 'login',
    component: LoginpageComponent,
    title: 'Log In - Our Kitchen',
    canActivate: [inverseIsAuthenticatedGuard],
  },
  {
    path: 'signup',
    title: 'Sign Up - Our Kitchen',
    component: SignuppageComponent,
    canActivate: [inverseIsAuthenticatedGuard],
  },
  { path: 'profile/:username', component: ProfilepageComponent },
  {
    path: 'profile/:username/edit',
    component: EditprofileformComponent,
    title: 'Edit Profile - Our Kitchen',
    // TODO - Add guard to check if user is logged in and is the same user as the profile they're trying to edit
  },
  {
    path: '**',
    component: PagenotfoundComponent,
    title: 'Page Not Found - Our Kitchen',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
