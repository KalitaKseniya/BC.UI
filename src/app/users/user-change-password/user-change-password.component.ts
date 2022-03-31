import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  PasswordChangeDto,
  User,
} from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
})
export class UserChangePasswordComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  user: User = null;
  error = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log('id=', params['id']);
          return this.usersService.getUserById(params['id']);
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.form = new FormGroup({
          username: new FormControl(user.userName),
          email: new FormControl(user.email),
          oldPassword: new FormControl(null, Validators.required),
          newPassword: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(environment.passwordPattern)
          ])),
        });
      });
  }

  mySubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const passwords: PasswordChangeDto = {
      oldPassword: this.form.get('oldPassword').value,
      newPassword: this.form.get('newPassword').value,
    };

    this.usersService.changePassword(this.user.id, passwords).subscribe(
      () => {
        this.error = null;
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'users']);
        this.alert.success('Password has been changed');
      },
      (error) => {
        console.log('Error when chnaging password ', error);
        this.submitted = false;
        this.error = error;
        this.alert.danger('Error when changing password');
      }
    );
  }
}
