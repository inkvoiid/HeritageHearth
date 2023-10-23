import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DeleteusermodalComponent } from '../../../partial/modals/deleteusermodal/deleteusermodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './editprofileform.component.html',
  styleUrls: ['./editprofileform.component.css'],
})
export class EditprofileformComponent implements OnInit {
  ogUsername: string = '';
  username: string = '';
  fullName: string = '';
  updateUserForm: FormGroup;
  canEditUsername: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.updateUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: '',
      theme: '',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.getUserData(this.username);
    });
  }

  getUserData(username: string) {
    this.userService.getUser(this.username).subscribe(
      (response: any) => {
        this.fullName = response.body.firstName + ' ' + response.body.lastName;
        this.updateUserForm = this.formBuilder.group({
          firstName: response.body.firstName,
          lastName: response.body.lastName,
          username: response.body.username,
          theme: response.body.theme,
        });
        this.ogUsername = response.body.username;
      },
      (error) => {}
    );
  }

  deleteUser() {
    let dialogRef = this.dialog.open(DeleteusermodalComponent, {
      data: { usernameToDelete: this.username },
    });
  }

  async onSubmit(form: any) {
    if (form.valid) {
      const user = form.value;

      // * If in edit mode, update the recipe

      try {
        const response = await firstValueFrom(
          this.userService.updateUser(this.ogUsername, user)
        );
        if (this.ogUsername !== user.username) {
          this.auth.logout();
        }
      } catch (error) {
        this.userService.showError(error);
      }
    }
  }
}
