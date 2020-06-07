import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../core/services';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) {
  }

  ngOnInit(): void {
  }

}
