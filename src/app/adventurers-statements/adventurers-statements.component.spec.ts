import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurersStatementsComponent } from './adventurers-statements.component';

describe('AdventurersStatementsComponent', () => {
  let component: AdventurersStatementsComponent;
  let fixture: ComponentFixture<AdventurersStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventurersStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurersStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
