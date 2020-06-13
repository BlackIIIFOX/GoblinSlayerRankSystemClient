import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService, ToastService} from '../core/services';
import {ContractsService} from '../core/services';
import {ContractCreate, User} from '../core/models';

@Component({
  selector: 'app-create-new-contract',
  templateUrl: './create-new-contract.component.html',
  styleUrls: ['./create-new-contract.component.css']
})
export class CreateNewContractComponent implements OnInit {
  newContractForm: FormGroup;


  submitted = false;
  processing = false;

  private contractor: User;

  constructor(private contractsService: ContractsService,
              private fb: FormBuilder,
              private accountService: AccountService,
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

    this.accountService.currentUser.subscribe(user => {
      this.contractor = user;
    }, error => {
      this.toastService.show('Ошибка', 'Ошибка получения информации о заказчике.' + error.message);
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

    const newContract: ContractCreate = {
      comment_contract_request: this.comment.value,
      contract_address: this.address.value,
      contract_customer: this.contractor.user_id,
      contract_description: this.description.value,
      contract_name: this.name.value,
      contract_reward: this.reward.value
    };

    this.processing = true;

    this.contractsService.createContract(newContract).subscribe(
      contract => {
        this.processing = false;
        this.toastService.show('', `Контракт №${contract.contract_id} создан. Ожидайте подтвеждения`);
        this.router.navigateByUrl('/');
      },
      error => {
        this.processing = false;
        this.toastService.show('Ошибка', 'Ошибка создания контракта.');
      }
    );
  }
}
