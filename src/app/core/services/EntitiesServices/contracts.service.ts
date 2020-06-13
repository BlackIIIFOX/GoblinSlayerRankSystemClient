import {Injectable} from '@angular/core';
import {BaseEntityService} from './base-entity.service';
import {Contract} from '../../models/contract.model';
import {Observable, of} from 'rxjs';
import {ContractCreate, ContractStatus, Rank, SearchResultPagination} from '../../models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractsService extends BaseEntityService<Contract> {
  protected matches(restaurant: Contract, term: string): boolean {
    return true;
  }

  protected search(): Observable<SearchResultPagination<Contract>> {
    // TODO: потом вернуть.
    // return this.getAll('/contracts');

    const {pageSize, page, searchTerm} = this.state;
    const contracts = [];

    const contract1: Contract = {
      comment_closed_contract: '',
      comment_contract_request: 'Комментарий 1',
      contract_address: 'Адресс 1',
      contract_customer: 1,
      contract_description: 'Описание контракта 1',
      contract_executor: null,
      contract_id: 1,
      contract_min_level: Rank.Bronze,
      contract_name: 'Контракт 1',
      contract_reward: 1235,
      contract_status: ContractStatus.Filed,
      create_time: '2020-06-13T22:10:00Z'
    };

    const contract2: Contract = {
      comment_closed_contract: '',
      comment_contract_request: 'Комментарий 2',
      contract_address: 'Адресс 1',
      contract_customer: 1,
      contract_description: 'Описание контракта 2',
      contract_executor: null,
      contract_id: 2,
      contract_min_level: Rank.Gold,
      contract_name: 'Контракт 2',
      contract_reward: 25,
      contract_status: ContractStatus.Filed,
      create_time: '2020-06-13T23:10:00Z'
    };

    const contract3: Contract = {
      comment_closed_contract: '',
      comment_contract_request: 'Комментарий 3',
      contract_address: 'Адресс 1',
      contract_customer: 1,
      contract_description: 'Описание контракта 3. С длинным описанием. С длинным описанием. С длинным описанием. С длинным описанием.',
      contract_executor: null,
      contract_id: 3,
      contract_min_level: Rank.Obsidian,
      contract_name: 'Контракт 3. С длинным названием для теста',
      contract_reward: 25555,
      contract_status: ContractStatus.Filed,
      create_time: '2020-06-13T23:10:00Z'
    };

    const contract4: Contract = {
      comment_closed_contract: '',
      comment_contract_request: 'Комментарий 4',
      contract_address: 'Адресс 1',
      contract_customer: 1,
      contract_description: 'Описание контракта 4.',
      contract_executor: null,
      contract_id: 2,
      contract_min_level: Rank.Porcelain,
      contract_name: 'Контракт 4. С длинным названием для теста',
      contract_reward: 21235,
      contract_status: ContractStatus.Filed,
      create_time: '2020-06-13T23:10:00Z'
    };

    contracts.push(contract1);
    contracts.push(contract2);
    contracts.push(contract3);
    contracts.push(contract4);

    return of(contracts)
      .pipe(
        map(
          entityMap => ({
            entities: entityMap.filter(
              entity => this.matches(entity, searchTerm)
            ).slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize), total: entityMap.length
          } as SearchResultPagination<Contract>)
        )
      );
  }

  public createContract(newContract: ContractCreate): Observable<Contract> {
    // return throwError(new Error('Error'));

    // TODO: mock, потом убрать
    const contract: Contract = {
      comment_closed_contract: '',
      comment_contract_request: newContract.comment_contract_request,
      contract_address: newContract.contract_address,
      contract_customer: newContract.contract_customer,
      contract_description: newContract.contract_description,
      contract_executor: null,
      contract_id: 1,
      contract_min_level: null,
      contract_name: newContract.contract_name,
      contract_reward: newContract.contract_reward,
      contract_status: ContractStatus.Filed,
      create_time: '2020-06-13T22:10:00Z'
    };

    return of(contract);
    // return this.apiService.post('/contracts', newContract);
  }

}
