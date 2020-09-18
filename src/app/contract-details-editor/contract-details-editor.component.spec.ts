import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailsEditorComponent } from './contract-details-editor.component';

describe('ContractDetailsEditorComponent', () => {
  let component: ContractDetailsEditorComponent;
  let fixture: ComponentFixture<ContractDetailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDetailsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDetailsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
