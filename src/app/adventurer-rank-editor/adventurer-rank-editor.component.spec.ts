import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerRankEditorComponent } from './adventurer-rank-editor.component';

describe('AdventurerRankEditorComponent', () => {
  let component: AdventurerRankEditorComponent;
  let fixture: ComponentFixture<AdventurerRankEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventurerRankEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventurerRankEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
