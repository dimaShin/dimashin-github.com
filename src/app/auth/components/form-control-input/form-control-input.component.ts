import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AbstractControl} from '@angular/forms/src/model';
import {ValidationErrors} from '@angular/forms/src/directives/validators';

export interface Validator {
  fn: (control: AbstractControl) => ValidationErrors | null;
  invalidMessage: string;
  key: string;
}

@Component({
  selector: 'app-form-control-input',
  templateUrl: './form-control-input.component.html',
  styleUrls: ['./form-control-input.component.scss'],
})
export class FormControlInputComponent {
  @Input() validators: Validator[] = [];
  @Input() type: string;
  @Input() placeholder: string;
  @Input() autocomplete: string;
  @Input() id: string;
  @Input() control: FormControl;
}
