import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  hidepassword = true;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const {username, password} = form.value;

      try{
        const response = await firstValueFrom(this.auth.login(username, password));

        if(response.accessToken != null){
          this.toastr.success("Login successful");
          this.router.navigate([`/profile/${username}`]);
        }
      }
      catch(error){
        const errorMessage = (error as any)?.error?.message || 'An error occurred'; // Use type assertion

        if(errorMessage === 'Unauthorised')
        {
          this.toastr.error("Please check your username or password and try again","Invalid credentials");
        }
        else
        {
        this.toastr.error(errorMessage,"An error occurred");
        }

        console.error(error);
      }
    }
  }

}
