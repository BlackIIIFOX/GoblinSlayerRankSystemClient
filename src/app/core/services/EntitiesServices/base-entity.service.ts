import {DecimalPipe} from '@angular/common';
import {ApiService} from '../api.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Items, SearchResultPagination, StatePagination} from '../../models';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseEntityService<Entity> {
  constructor(protected apiService: ApiService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      switchMap(() => this.search()),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._entities$.next(result.entities);
      this._total$.next(result.total);
    }, error => {
    });

    this._search$.next();
  }

  get page() {
    return this.state.page;
  }

  set page(page: number) {
    this._set({page});
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get pageSize() {
    return this.state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  get searchFilter() {
    return this.state.searchFilter;
  }

  get entities$() {
    return this._entities$.asObservable();
  }

  // tslint:disable-next-line:variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line:variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line:variable-name
  private _total$ = new BehaviorSubject<number>(0);
  // tslint:disable-next-line:variable-name
  private _entities$ = new BehaviorSubject<Entity[]>([]);

  protected state: StatePagination = {
    page: 1,
    pageSize: 10,
    searchFilter: new Map<string, string>()
  };

  protected abstract search(): Observable<SearchResultPagination<Entity>>;

  protected getAll(endpointGetAll: string): Observable<SearchResultPagination<Entity>> {
    const {pageSize, page, searchFilter} = this.state;

    let filers = '';

    searchFilter.forEach((value: string, key: string) => {
      if (!!value && value.trim().length > 0) {
        filers += `&${key}=${value.trim()}`;
      }
    });

    const finalEndpoint = `${endpointGetAll}?size=${pageSize}&page=${page - 1}${filers}`;

    return this.apiService.get(finalEndpoint).pipe(
      map(
        (items: Items<Entity>) => ({
          entities: items.items, total: items.totalItems
        } as SearchResultPagination<Entity>)
      )
    );
  }

  public refresh() {
    this._search$.next();
  }

  private _set(patch: Partial<StatePagination>) {
    Object.assign(this.state, patch);
    this._search$.next();
  }
}
