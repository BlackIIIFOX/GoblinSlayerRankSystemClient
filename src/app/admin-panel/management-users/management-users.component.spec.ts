import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementUsersComponent } from './management-users.component';

describe('UsersComponent', () => {
  let component: ManagementUsersComponent;
  let fixture: ComponentFixture<ManagementUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
