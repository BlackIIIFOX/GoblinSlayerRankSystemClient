import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService, ToastService, UsersService} from '../core';
import {CustomerCreate, AdventurerCreate} from '../core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  processing = false;
  userAlreadyExist = false;
  registrationForm: FormGroup;
  isAdventurerRegistration: boolean;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.isAdventurerRegistration = this.router.url.includes('adventurer-registration');

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

    if (this.isAdventurerRegistration) {
      this.registrationForm.addControl('reason', new FormControl('', Validators.required));
    }
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

  get reason(): AbstractControl {
    return this.registrationForm.get('reason');
  }

  onSubmit() {
    this.submitted = true;

    // Если форма не валидна, то ждем пока ее поправит пользователь
    if (!this.registrationForm.valid) {
      return;
    }

    this.processing = true;

    let registrationObservable: Observable<any>;

    if (this.isAdventurerRegistration) {
      const newAdventurer: AdventurerCreate = {
        address: this.address.value,
        username: this.email.value,
        name: this.fullName.value,
        password: this.password.value,
        reason: this.reason.value
      };

      registrationObservable = this.accountService.createAdventurer(newAdventurer);
    } else {
      const newContractor: CustomerCreate = {
        address: this.address.value,
        username: this.email.value,
        name: this.fullName.value,
        password: this.password.value
      };

      registrationObservable = this.accountService.createCustomer(newContractor);
    }

    registrationObservable.subscribe(newUser => {
      this.processing = false;
      this.toastService.show('', 'Вы зарегистрированы, выполните авторизацию.');
      this.router.navigateByUrl('/');
    }, error => {
      if (error.status === 400) {
        this.userAlreadyExist = true;
      } else {
        this.toastService.show('Ошибка', 'Критическая ошибка на сервере.');
      }

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
