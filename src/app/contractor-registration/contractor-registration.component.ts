import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService, UsersService} from '../core/services';
import {Role, UserCreate} from '../core/models';
import {Md5} from 'ts-md5';
import {delay} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contractor-registration',
  templateUrl: './contractor-registration.component.html',
  styleUrls: ['./contractor-registration.component.css']
})
export class ContractorRegistrationComponent implements OnInit {

  submitted = false;
  processing = false;
  userAlreadyExist = false;
  registrationForm: FormGroup;

  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        fullName: ['', Validators.required],
        address: ['', Validators.required]
      }
      , {
        validator: this.MustMatch('password', 'confirmPassword')
      });
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }

  get password(): AbstractControl {
    return this.registrationForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.registrationForm.get('confirmPassword');
  }

  get fullName(): AbstractControl {
    return this.registrationForm.get('fullName');
  }

  get address(): AbstractControl {
    return this.registrationForm.get('address');
  }

  submitForm() {
    this.submitted = true;

    // Если форма не валидна, то ждем пока ее поправит пользователь
    if (!this.registrationForm.valid) {
      return;
    }

    this.processing = true;

    const newContractor: UserCreate = {
      user_address: this.address.value,
      user_login: this.email.value,
      user_name: this.fullName.value,
      user_password: (Md5.hashStr(this.password.value) as string),
      user_role: Role.Customer
    };

    this.usersService.createUser(newContractor)
      .subscribe(newUser => {
        this.processing = false;
        this.toastService.show('', 'Вы зарегистрированы, выполните авторизацию.');
        this.router.navigateByUrl('/');
      }, error => {
        this.userAlreadyExist = true;
        this.processing = false;
      });
  }

  // custom validator to check that two fields match (https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example)
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
