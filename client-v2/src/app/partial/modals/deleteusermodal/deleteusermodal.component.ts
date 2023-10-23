import { UserService } from '../../../services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-deleteusermodal',
  templateUrl: './deleteusermodal.component.html',
  styleUrls: ['./deleteusermodal.component.css'],
})
export class DeleteusermodalComponent implements OnInit {
  usernameToDelete: string = '';
  deleteUserForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteusermodalComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.deleteUserForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.usernameToDelete = this.data.usernameToDelete;
  }

  close() {
    this.dialogRef.close();
  }

  deleteUser() {
    if (this.deleteUserForm.valid) {
      if (this.deleteUserForm.value.username === this.usernameToDelete) {
        this.userService
          .deleteUser(this.usernameToDelete, this.deleteUserForm.value.password)
          .subscribe((response: any) => {
            if (response.status === 200) {
              this.dialogRef.close();
              this.auth.logout();
            }
          });
      } else {
        this.toastr.error('You can only delete your account!', 'Error');
      }
    }
  }
}
