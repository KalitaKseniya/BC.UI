import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Role, UserForCreationDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss'],
})
export class UserCreatePageComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  roles: Role[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private rolesService: RolesService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      secondName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(environment.passwordPattern)
      ])),
      passwordConfirm: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl(this.roles[0], Validators.required),
    });

  }

  submit() {
    console.log(this.form)
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: UserForCreationDto = {
      firstName: this.form.get('firstName').value,
      secondName: this.form.get('secondName').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      passwordConfirm: this.form.get('passwordConfirm').value,
      role: this.form.get('role').value,
    };

    console.log(user);
    this.usersService.createUser(user).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'users']);
        this.alert.success('User has been created');
      },
      (error) => {
        console.log('Error when creating ', error);
        this.submitted = false;
      }
    );
  }

  loadRoles() {
    this.rolesService.getRoles()
    .subscribe((roles: Role[]) => {
      this.roles = roles
    });
  }
}
