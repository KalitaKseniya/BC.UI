import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserForAuthenticationDto } from '../shared/interfaces';
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

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('admin@admin.com', Validators.required),// ToDo K: delete
      password: new FormControl('Admin123!', [
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
          this.router.navigate(['/admin', 'part-models']);
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
