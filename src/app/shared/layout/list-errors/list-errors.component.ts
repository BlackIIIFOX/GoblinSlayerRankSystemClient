import {Component, Input, OnInit} from '@angular/core';
import {Errors} from '../../../core/models';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent implements OnInit {
  private formattedErrors: Array<string> = [];

  constructor() { }

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  ngOnInit(): void {
  }

  get errorList() { return this.formattedErrors; }

}
