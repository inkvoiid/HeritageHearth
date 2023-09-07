import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RecipepreviewComponent } from './recipepreview/recipepreview.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { AddrecipebuttonComponent } from './addrecipebutton/addrecipebutton.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RecipeformComponent } from './recipeform/recipeform.component';
import { AuditlogpageComponent } from './auditlogpage/auditlogpage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    RecipesComponent,
    PagenotfoundComponent,
    RecipepreviewComponent,
    LoginpageComponent,
    ProfilepageComponent,
    SignuppageComponent,
    AddrecipebuttonComponent,
    RecipeformComponent,
    AuditlogpageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('ourkitchen_auth');
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
