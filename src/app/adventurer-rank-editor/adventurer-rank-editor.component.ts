import {Component, Input, OnInit} from '@angular/core';
import {Adventurer, Rank} from '../core/models';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AdventurersService, ToastService} from '../core/services';

@Component({
  selector: 'app-adventurer-rank-editor',
  templateUrl: './adventurer-rank-editor.component.html',
  styleUrls: ['./adventurer-rank-editor.component.css']
})
export class AdventurerRankEditorComponent implements OnInit {

  rankUpdateForm: FormGroup;
  public submitted: boolean;
  public processing: boolean;
  public ranks = Object.values(Rank);

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private adventurersService: AdventurersService,
              private toastService: ToastService) {
  }

  @Input() adventurer: Adventurer;

  ngOnInit(): void {
    this.rankUpdateForm = this.fb.group(
      {
        rank: [this.adventurer.rank, Validators.required],
        reason: ['', [Validators.required]]
      }
    );
  }

  get rank(): AbstractControl {
    return this.rankUpdateForm.get('rank');
  }

  get reason(): AbstractControl {
    return this.rankUpdateForm.get('reason');
  }

  onSubmit() {
    this.submitted = true;

    if (!this.rank.valid || !this.reason.valid) {
      return;
    }

    this.processing = true;
    this.adventurersService.updateAdventurerRank(this.adventurer.id, this.rank.value, this.reason.value)
      .subscribe(adventurer => {
        this.activeModal.close('Updated');
        this.processing = false;
      }, exception => {
        this.toastService.show('Ошибка', 'Не удалось обновить ранг');
        this.processing = false;
      });
  }

}
