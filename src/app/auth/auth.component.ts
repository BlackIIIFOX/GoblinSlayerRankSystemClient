import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AccountService, Errors} from '../core';
import {Md5} from 'ts-md5';

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
      login: this.email.value,
      password: (Md5.hashStr(this.password.value) as string)
    };

    this.userService
      .logIn(credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        errors => {
          this.errors = {
            errors: {
              '': 'Такого пользователя не существует'
            }
          };

          console.log(errors);

          // this.errors = errors;
          this.isSubmitting = false;
        }
      );
  }
}
