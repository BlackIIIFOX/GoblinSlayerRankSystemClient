import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListContractsComponent } from './my-list-contracts.component';

describe('MyListContractsComponent', () => {
  let component: MyListContractsComponent;
  let fixture: ComponentFixture<MyListContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
