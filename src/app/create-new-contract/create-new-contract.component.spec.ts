import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewContractComponent } from './create-new-contract.component';

describe('CreateNewContractComponent', () => {
  let component: CreateNewContractComponent;
  let fixture: ComponentFixture<CreateNewContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
