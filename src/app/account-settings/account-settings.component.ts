import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService, ToastService} from '../core/services';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountPasswordUpdate, AccountUpdate} from '../core/models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {

  private accountSubscription: Subscription;
  isCollapsed = true;
  updateForm: FormGroup;
  passwordForm: FormGroup;
  submitted = false;
  submittedPassword = false;
  processing = false;

  constructor(private accountService: AccountService, private fb: FormBuilder, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        address: ['', Validators.required]
      });

    this.accountSubscription = this.accountService.currentUser.subscribe(user => {
      if (user) {
        this.fullName.setValue(user.name);
        this.address.setValue(user.address);
      }
    });

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }
      , {
        validator: this.MustMatch('password', 'confirmPassword')
      });
  }

  get fullName(): AbstractControl {
    return this.updateForm.get('fullName');
  }

  get address(): AbstractControl {
    return this.updateForm.get('address');
  }

  get oldPassword(): AbstractControl {
    return this.passwordForm.get('oldPassword');
  }

  get password(): AbstractControl {
    return this.passwordForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.passwordForm.get('confirmPassword');
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    const accountInfo: AccountUpdate = {
      address: this.address.value, name: this.fullName.value
    };

    this.processing = true;
    this.accountService.updateAccountInfo(accountInfo).subscribe(() => {
      this.processing = false;
      this.toastService.show('', 'Обновлено.');
    }, error => {
      this.processing = false;
      this.toastService.show('Ошибка', 'Критическая ошибка на сервере.');
    });
  }

  onSubmitPassword() {
    this.submittedPassword = true;

    if (this.passwordForm.invalid) {
      return;
    }

    const newPassword: AccountPasswordUpdate = {
      newPassword: this.password.value, oldPassword: this.oldPassword.value
    };

    this.processing = true;
    this.accountService.updatePassword(newPassword).subscribe(() => {
    }, error => {
      this.processing = false;
      this.toastService.show('Ошибка', 'Критическая ошибка на сервере.');
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

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
