import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../core/services';
import {Credentials} from '../../../core/models';
import {DecimalPipe} from '@angular/common';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private usersService: UsersService) {
  }

  get login() {
    return this.userCreateForm.get('login');
  }

  get password() {
    return this.userCreateForm.get('password');
  }

  userCreateForm = this.fb.group(
    {
      login: ['', Validators.required],
      password: ['', [Validators.required]]
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    // const createInfo: Credentials = {
    //   login: this.login.value,
    //   password: (Md5.hashStr(this.password.value) as string)
    // };
    //
    // this.usersService.createUser(createInfo).subscribe(() => {
    //   this.activeModal.close('Created');
    // }, () => {
    //   // TODO: надо что то показывать пользователю.
    // });
  }
}
