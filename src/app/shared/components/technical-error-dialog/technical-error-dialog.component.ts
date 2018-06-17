import { Component } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-technical-error-dialog',
  templateUrl: './technical-error-dialog.component.html',
  styleUrls: ['./technical-error-dialog.component.scss']
})
export class TechnicalErrorDialogComponent {

  body = '';

  constructor(public modalRef: BsModalRef) {}

}
