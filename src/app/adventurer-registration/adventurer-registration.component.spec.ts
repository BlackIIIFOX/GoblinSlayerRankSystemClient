import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerRegistrationComponent } from './adventurer-registration.component';

describe('AdventurerRegistrationComponent', () => {
  let component: AdventurerRegistrationComponent;
  let fixture: ComponentFixture<AdventurerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventurerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
