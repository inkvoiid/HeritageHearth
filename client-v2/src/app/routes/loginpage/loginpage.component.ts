import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent implements OnInit {
  hidepassword = true;

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const { username, password } = form.value;

      try {
        const response = await firstValueFrom(
          this.auth.login(username, password)
        );
      } catch (error) {
        this.auth.loginError(error);
      }
    }
  }
}
