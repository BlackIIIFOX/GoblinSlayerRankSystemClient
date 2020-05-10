import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {UsersService} from '../../../core/services';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _user: User;

  userUpdateForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  get user() {
    return this._user;
  }

  @Input() set user(value: User) {
    this._user = value;

    // this.userUpdateForm = this.fb.group(
    //   {
    //     login: [this._user.login, Validators.required],
    //     password: [''],
    //     fullName: [this._user.fullName],
    //     role: [this._user.role, [Validators.required]],
    //     isBlocked: [this._user.isBlocked]
    //   }
    // );

  }

  onSubmit() {
    // const info: UserUpdateInfo = {
    //   login: this.userUpdateForm.get('login').value,
    //   password: this.userUpdateForm.get('password').value,
    //   fullName: this.userUpdateForm.get('fullName').value,
    //   role: this.userUpdateForm.get('role').value,
    //   isBlocked: this.userUpdateForm.get('isBlocked').value,
    //   avatar: this.user.avatar
    // };

    // if (info.password === '') {
    //   info.password = null;
    // }
    //
    // this.usersService.updateUser(this.user.id, info).subscribe(user => {
    //   this.activeModal.close('Updated');
    // }, error => {
    //   // TODO: надо что то показывать пользователю.
    // });
  }

  onFileChanged(files: FileList) {
    const selectedFile = files[0];
  }
}
