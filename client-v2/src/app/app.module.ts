import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { HomepageComponent } from './routes/homepage/homepage.component';
import { PagenotfoundComponent } from './routes/pagenotfound/pagenotfound.component';
import { RecipepreviewComponent } from './partial/recipepreview/recipepreview.component';
import { LoginpageComponent } from './routes/loginpage/loginpage.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProfilepageComponent } from './routes/profilepage/profilepage.component';
import { SignuppageComponent } from './routes/forms/signuppage/signuppage.component';
import { AddrecipebuttonComponent } from './partial/addrecipebutton/addrecipebutton.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RecipeformComponent } from './routes/forms/recipeform/recipeform.component';
import { AuditlogpageComponent } from './routes/auditlogpage/auditlogpage.component';
import { BrowserecipepageComponent } from './routes/browserecipepage/browserecipepage.component';
import { RecipepageComponent } from './routes/recipepage/recipepage.component';
import { EditprofileformComponent } from './routes/forms/editprofileform/editprofileform.component';
import { MobileheaderComponent } from './partial/mobileheader/mobileheader.component';
import { DeleterecipemodalComponent } from './partial/modals/deleterecipemodal/deleterecipemodal.component';
import { DeleteusermodalComponent } from './partial/modals/deleteusermodal/deleteusermodal.component';
import { AdmindashpageComponent } from './routes/admindashpage/admindashpage.component';
import { RecipeapprovalpreviewComponent } from './partial/recipeapprovalpreview/recipeapprovalpreview.component';
import { RejectrecipemodalComponent } from './partial/modals/rejectrecipemodal/rejectrecipemodal.component';
import { UserpreviewComponent } from './partial/userpreview/userpreview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    PagenotfoundComponent,
    RecipepreviewComponent,
    LoginpageComponent,
    ProfilepageComponent,
    SignuppageComponent,
    AddrecipebuttonComponent,
    RecipeformComponent,
    AuditlogpageComponent,
    BrowserecipepageComponent,
    RecipepageComponent,
    EditprofileformComponent,
    MobileheaderComponent,
    DeleterecipemodalComponent,
    DeleteusermodalComponent,
    AdmindashpageComponent,
    RecipeapprovalpreviewComponent,
    RejectrecipemodalComponent,
    UserpreviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('ourkitchen_auth');
        },
      },
    }),
    MaterialFileInputModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
