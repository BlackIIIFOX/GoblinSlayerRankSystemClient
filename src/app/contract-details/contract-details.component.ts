import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../core/models/contract.model';
import {switchMap} from 'rxjs/operators';
import {AccountService, ContractsService, ToastService} from '../core/services';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContractStatus, ContractUpdate, Rank, Role, User} from '../core/models';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  public contract: Contract;
  public contractId: number;
  public processing = false;
  public detailForm: FormGroup;
  public submitted = false;
  public contractStatusEnum = ContractStatus;
  public contractStatus = Object.values(ContractStatus);
  public ranks = Object.values(Rank);
  public isUserCanUpdateContract = false;
  public currentUser: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService,
              private toastService: ToastService,
              private fb: FormBuilder,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(
      user => {
        this.currentUser = user;

        this.isUserCanUpdateContract = this.currentUser.user_role === Role.Registrar;

        if (!this.isUserCanUpdateContract) {
          this.detailForm?.disable();
        }
      }
    );

    this.route.paramMap.pipe(
      // delay(1000),
      switchMap(params => {
          this.contractId = Number(params.get('id'));
          return this.contractsService.getById(this.contractId);
        }
      ),
    ).subscribe(contract => {
      this.initContract(contract);
    }, error => {
      this.toastService.show('Ошибка', 'Ошибка при загрузке контракта');
    });
  }

  private initContract(contract: Contract) {
    this.contract = contract;

    // const currentStatus = ContractStatus[];
    const isContractFiled = contract.contract_status === ContractStatus.Filed;

    this.status?.enable();

    this.detailForm = this.fb.group(
      {
        minLevel: [this.contract.contract_min_level, Validators.required],
        status: [this.contract.contract_status, Validators.required],
        registrarComment: ['']
      });

    if (isContractFiled) {
      this.status.disable();
    }

    if (!this.isUserCanUpdateContract) {
      this.detailForm.disable();
    }
  }

  get status(): AbstractControl {
    return this.detailForm?.get('status');
  }

  get minLevel(): AbstractControl {
    return this.detailForm?.get('minLevel');
  }

  get registrarComment(): AbstractControl {
    return this.detailForm?.get('registrarComment');
  }

  onAccept() {
    this.status.setValue(ContractStatus.Accepted);
    this.updateContract();
  }

  onReject() {
    this.status.setValue(ContractStatus.Rejected);
    this.updateContract();
  }

  updateContract() {
    const updateInfo: ContractUpdate = {
      comment_closed_contract: this.contract.comment_closed_contract,
      comment_contract_request: this.contract.comment_contract_request,
      contract_address: this.contract.contract_address,
      contract_customer: this.contract.contract_customer,
      contract_description: this.contract.contract_description,
      contract_executor: this.contract.contract_executor,
      contract_min_level: this.minLevel.value,
      contract_name: this.contract.contract_name,
      contract_reward: this.contract.contract_reward,
      contract_status: this.status.value
    };

    this.contractsService.updateContract(this.contractId, updateInfo)
      .subscribe(contract => {
        this.initContract(contract);
        this.toastService.show('', 'Контракт обновлен');
      }, error => {
        this.toastService.show('Ошибка', 'Не удалось обновить контракт. ' + error.message);
      });
  }
}
