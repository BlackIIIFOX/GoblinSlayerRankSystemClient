import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListContractsComponent } from './all-list-contracts.component';

describe('AllListContractsComponent', () => {
  let component: AllListContractsComponent;
  let fixture: ComponentFixture<AllListContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllListContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllListContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
