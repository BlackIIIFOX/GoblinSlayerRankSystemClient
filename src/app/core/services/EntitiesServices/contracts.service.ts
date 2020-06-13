import {Injectable} from '@angular/core';
import {BaseEntityService} from './base-entity.service';
import {Contract} from '../../models/contract.model';
import {Observable, of} from 'rxjs';
import {ContractCreate, ContractStatus, SearchResultPagination} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ContractsService extends BaseEntityService<Contract> {
  protected matches(restaurant: Contract, term: string): boolean {
    return true;
  }

  protected search(): Observable<SearchResultPagination<Contract>> {
    return this.getAll('/contracts');
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
