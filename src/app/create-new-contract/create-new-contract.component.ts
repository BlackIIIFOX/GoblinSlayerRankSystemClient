import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastService} from '../core/services';

@Component({
  selector: 'app-create-new-contract',
  templateUrl: './create-new-contract.component.html',
  styleUrls: ['./create-new-contract.component.css']
})
export class CreateNewContractComponent implements OnInit {
  newContractForm: FormGroup;

  submitted = false;
  processing = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.newContractForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        address: ['', Validators.required],
        reward: ['', [Validators.required, Validators.min(0), Validators.pattern('\\d*')]],
        description: ['', Validators.required],
        comment: ['']
      });
  }

  get name(): AbstractControl {
    return this.newContractForm.get('name');
  }

  get address(): AbstractControl {
    return this.newContractForm.get('address');
  }

  get reward(): AbstractControl {
    return this.newContractForm.get('reward');
  }

  get description(): AbstractControl {
    return this.newContractForm.get('description');
  }

  get comment(): AbstractControl {
    return this.newContractForm.get('comment');
  }


  onSubmit() {
    this.submitted = true;

    if (!this.newContractForm.valid) {
      return;
    }

    this.processing = true;
  }
}
