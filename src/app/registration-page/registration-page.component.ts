import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PasswordInputVisibility } from '../shared/models/models';
import { UserRegisterRequest } from '../shared/models/userRegisterRequest';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  wrongCredentials = false;
  message: string = null;
  passwordVisibility: PasswordInputVisibility;
  passwordConfirmVisibility: PasswordInputVisibility;

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
    this.passwordConfirmVisibility = {
      showPassword: false,
      inputType: 'password'
    };
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(environment.passwordPattern)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      firstName: new FormControl(null, Validators.required),
      secondName: new FormControl(null, Validators.required),
    });
  }

  redirectToLoginPage() {
    this.router.navigate(['']);
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
    const userForRegistration: UserRegisterRequest = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      passwordConfirm: this.form.get('passwordConfirm').value,
      firstName: this.form.get('firstName').value,
      secondName: this.form.get('secondName').value
    };

    this.auth.register(userForRegistration).subscribe(
      () => {
        this.form.reset();
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
