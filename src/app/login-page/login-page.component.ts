import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserForAuthenticationDto } from '../shared/interfaces';
import { PasswordInputVisibility } from '../shared/models/models';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  wrongCredentials = false;
  message: string = null;
  passwordVisibility: PasswordInputVisibility;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.passwordVisibility = {
      showPassword: false,
      inputType: 'password'
    };
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please enter your email and password';
      }
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  adminLogin() {// ToDo K: delete
    this.form.patchValue({
      email : "admin@admin.com",
      password : "Admin123!"
    });
  }

  masterLogin() {// ToDo K: delete
    this.form.patchValue({
      email : "master@master.com",
      password : "Master123!"
    });
  }

  userLogin(){// ToDo K: delete
    this.form.patchValue({
      email : "user@user.com",
      password : "User123!"
    });
  }

  changePasswordVisibility(password: PasswordInputVisibility) {
    if (password.inputType === 'password') {
      password.inputType = 'text';
      password.showPassword = true;
    } else {
      password.inputType = 'password';
      password.showPassword = false;
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const userForAuth: UserForAuthenticationDto = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };

    this.auth.login(userForAuth).subscribe(
      () => {
        this.form.reset();
        if (this.auth.isAuthenticated()) {
          this.router.navigate(['/admin', 'account']);
        }
        this.submitted = false;
        this.wrongCredentials = false;
      },
      () => {
        this.submitted = false;
        this.wrongCredentials = true;
      }
    );
  }
}
