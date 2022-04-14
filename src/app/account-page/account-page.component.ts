import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Role, User } from '../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';
import { RolesService } from '../shared/services/roles.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  user: User;
  loading = false;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
     this.usersService.getCurrentUser()
      .subscribe((user: User) => {
        console.log(user);
        this.user = user;
        this.form = new FormGroup({
          username: new FormControl(user.userName, Validators.required),
          firstName: new FormControl(user.firstName, Validators.required),
          secondName: new FormControl(user.secondName, Validators.required),
          role: new FormControl(user.role, Validators.required),
          email: new FormControl(user.email, [
            Validators.required,
            Validators.email,
          ]),
        });
      });
  }

}
