import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerDashboardComponent } from './adventurer-dashboard.component';

describe('AdventurerDashboardComponent', () => {
  let component: AdventurerDashboardComponent;
  let fixture: ComponentFixture<AdventurerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventurerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
