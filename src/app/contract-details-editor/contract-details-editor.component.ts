import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../core/models/contract.model';
import {switchMap} from 'rxjs/operators';
import {AccountService, AdventurersService, ContractsService, ToastService} from '../core/services';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Adventurer, ContractStatus, ContractUpdate, Rank, Role, User} from '../core/models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contract-details-editor',
  templateUrl: './contract-details-editor.component.html',
  styleUrls: ['./contract-details-editor.component.css']
})
export class ContractDetailsEditorComponent implements OnInit, OnDestroy {

  public contract: Contract;
  public contractId: number;
  public processing = false;
  public detailForm: FormGroup;
  public submitted = false;
  public contractStatusEnum = ContractStatus;
  public contractStatus = Object.values(ContractStatus);
  public ranks = Object.values(Rank);
  public isUserCanUpdateContract = false;
  public isAdventurer;
  public currentUser: User;
  private accountSubscription: Subscription;
  public executor: Adventurer;
  public adventurerComment: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService,
              private toastService: ToastService,
              private fb: FormBuilder,
              private accountService: AccountService,
              private adventurerService: AdventurersService) {
  }

  ngOnInit(): void {
    this.accountSubscription = this.accountService.currentUser.subscribe(
      user => {
        console.log('test');
        this.currentUser = user;

        this.isUserCanUpdateContract = this.currentUser.roles.includes(Role.Registrar);
        this.isAdventurer = this.currentUser.roles.includes(Role.Adventurer);

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

    if (contract.executor) {
      if (!this.executor || this.executor.id !== contract.executor) {
        this.adventurerService.getById(contract.executor).subscribe(executor => {
            this.executor = executor;
          },
          error => {
            this.toastService.show('Ошибка', 'Не получить информацию об исполнителе' + error.message);
          });
      }
    } else {
      this.executor = null;
    }

    this.adventurerComment = null;

    if (contract.cancellationComment) {
      this.adventurerComment = contract.cancellationComment;
    }

    if (contract.performedComment) {
      this.adventurerComment = contract.performedComment;
    }

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

  onPayed() {
    this.updateContract(ContractStatus.Accepted);
  }

  onPayout() {
    this.updateContract(ContractStatus.Completed);
  }

  onAcceptPerformed() {
    this.updateContract(ContractStatus.Payout);
  }

  updateContractFromForm() {
    this.updateContract(this.status.value);
  }

  private updateContract(newStatus: ContractStatus) {
    this.submitted = true;

    if (!this.detailForm.valid) {
      return;
    }

    if (newStatus === null) {
      throw new Error('newStatus is null');
    }

    let executor = this.contract.executor;
    if (newStatus === ContractStatus.Accepted) {
      executor = null;
    }

    const updateInfo: ContractUpdate = {
      registrarComment: this.registrarComment.value,
      requestComment: this.contract.requestComment,
      address: this.contract.address,
      description: this.contract.description,
      executor,
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

  onAcceptAdventurer() {
    this.contractsService.startPerform(this.contractId)
      .subscribe(contract => {
        this.initContract(contract);
        this.toastService.show('', 'Вы назначены исполнителем контракта');
      }, error => {
        this.toastService.show('Ошибка', 'Не удалось принять контракт. ' + error.message);
      });
  }

  onCancelAdventurer() {
    if (this.adventurerComment) {
      this.contractsService.cancelPerform(this.contractId, this.adventurerComment)
        .subscribe(contract => {
          this.initContract(contract);
          this.toastService.show('', 'Вы отменили исполнение контракта');
        }, error => {
          this.toastService.show('Ошибка', 'Не удалось отменить исполнение контракт. ' + error.message);
        });
    }
  }

  onPerformedAdventurer() {
    if (this.adventurerComment) {
      this.contractsService.performed(this.contractId, this.adventurerComment)
        .subscribe(contract => {
          this.initContract(contract);
          this.toastService.show('', 'Вы подтвердили исполнили контракт, ожидайте подтверждения');
        }, error => {
          this.toastService.show('Ошибка', 'Не удалось обновить контракт. ' + error.message);
        });
    }
  }

  adventurerCommentChange($event) {
    try {
      this.adventurerComment = $event.target.value;
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.info('could not set adventurerComment');
    }
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
