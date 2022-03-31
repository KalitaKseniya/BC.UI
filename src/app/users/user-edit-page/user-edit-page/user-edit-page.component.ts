import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, UserForUpdateDto } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';
import { switchMap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss'],
})
export class UserEditPageComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  user: User;
  loading = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          console.log('id=', params['id']);
          return this.usersService.getUserById(params['id']);
        })
      )
      .subscribe((user: User) => {
        console.log(user);
        this.user = user;
        this.form = new FormGroup({
          firstName: new FormControl(user.firstName, Validators.required),
          secondName: new FormControl(user.secondName, Validators.required),
          email: new FormControl(user.email, [
            Validators.required,
            Validators.email,
          ]),
          role: new FormControl(this.user.role),
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: UserForUpdateDto = {
      firstName: this.form.get('firstName').value,
      secondName: this.form.get('secondName').value,
      email: this.form.get('email').value,
    };

    console.log(user);
    this.usersService.updateUser(this.user.id, user).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'users']);
        this.alert.success('User has been updated');
      },
      (error) => {
        console.log('Error when updating ', error);
        this.submitted = false;
      }
    );
  }
}
