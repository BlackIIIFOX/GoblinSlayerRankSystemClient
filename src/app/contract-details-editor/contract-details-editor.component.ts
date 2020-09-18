import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../core/models/contract.model';
import {switchMap} from 'rxjs/operators';
import {AccountService, ContractsService, ToastService} from '../core/services';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContractStatus, ContractUpdate, Rank, Role, User} from '../core/models';

@Component({
  selector: 'app-contract-details-editor',
  templateUrl: './contract-details-editor.component.html',
  styleUrls: ['./contract-details-editor.component.css']
})
export class ContractDetailsEditorComponent implements OnInit {

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

        this.isUserCanUpdateContract = this.currentUser.roles.includes(Role.Registrar);

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
    const isContractCreated = contract.contractStatus === ContractStatus.Created;

    this.status?.enable();

    this.detailForm = this.fb.group(
      {
        minLevel: [this.contract.minRank, Validators.required],
        status: [this.contract.contractStatus, Validators.required],
        registrarComment: [this.contract.registrarComment, Validators.required]
      });

    if (isContractCreated) {
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
    this.updateContract(ContractStatus.Payment);
  }

  onReject() {
    this.updateContract(ContractStatus.Rejected);
  }

  updateContract(newStatus: ContractStatus) {
    this.submitted = true;

    if (!this.detailForm.valid) {
      return;
    }

    if (newStatus === null) {
      newStatus = this.status.value;
    }

    const updateInfo: ContractUpdate = {
      registrarComment: this.registrarComment.value,
      requestComment: this.contract.requestComment,
      address: this.contract.address,
      description: this.contract.description,
      executor: this.contract.executor,
      minRank: this.minLevel.value,
      reward: this.contract.reward,
      contractStatus: newStatus
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
