import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AccountService, Errors} from '../core';
import {Md5} from 'ts-md5';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AccountService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email(): AbstractControl {
    return this.authForm.get('email');
  }

  get password(): AbstractControl {
    return this.authForm.get('password');
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = {
      username: this.email.value,
      password: this.password.value
    };

    this.userService
      .logIn(credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        errors => {
          let errorMessage = 'Произошла непредвиненная ошибка';

          if (errors.status === 403) {
            errorMessage = 'Введен неверный логин или пароль';
          }

          this.errors = {
            errors: {
              '': errorMessage
            }
          };

          console.log(errors);

          // this.errors = errors;
          this.isSubmitting = false;
        }
      );
  }
}
