import {Injectable} from '@angular/core';
import {BaseEntityService} from './base-entity.service';
import {Contract} from '../../models/contract.model';
import {Observable, of} from 'rxjs';
import {ContractCreate, ContractStatus, ContractUpdate, Rank, SearchResultPagination} from '../../models';
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
    return this.getAll('/contracts');
  }

  public createContract(newContract: ContractCreate): Observable<Contract> {
    return this.apiService.post('/contracts', newContract);
  }

  getById(id: number) {
    return this.apiService.get(`/contracts/${id}`);
  }

  updateContract(contractId: number, updateContract: ContractUpdate): Observable<Contract> {
    return this.apiService.put(`/contracts/${contractId}`, updateContract);
  }
}
