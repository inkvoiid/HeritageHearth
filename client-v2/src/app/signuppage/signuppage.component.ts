import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';
import { passwordMatchValidator } from '../password-match.validator';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css'],
})
export class SignuppageComponent implements OnInit {
  hidepassword = true;
  hideconfirmpassword = true;

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmpassword: [null, [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [passwordMatchValidator('password', 'confirmpassword')], // Use the custom validator here
      }
    );
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const { firstName, lastName, username, password, confirmpassword } =
        form.value;

      try {
        const response = await firstValueFrom(
          this.userService.createNewUser({
            firstName,
            lastName,
            username,
            password,
            confirmpassword,
          })
        );
      } catch (error) {
        this.userService.signupError(error);
      }
    }
  }
}
