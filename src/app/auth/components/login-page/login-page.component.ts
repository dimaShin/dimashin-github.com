import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Validator} from '../form-control-input/form-control-input.component';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public authForm: FormGroup = null;

  public usernameValidators: Validator[] = [{
    fn: Validators.required,
    key: 'required',
    invalidMessage: 'Username is required'
  }, {
    fn: Validators.minLength(5),
    key: 'minlength',
    invalidMessage: 'Should be at least 5 characters'
  }];

  public passwordValidators: Validator[] = [{
    fn: Validators.required,
    key: 'required',
    invalidMessage: 'Password is required'
  }, {
    fn: Validators.minLength(8),
    key: 'minlength',
    invalidMessage: 'Should be at least 8 characters'
  }, {
    fn: Validators.pattern(/\d/),
    key: 'pattern',
    invalidMessage: 'Should has at least one digit'
  }, {
    fn: this.validateCharsRegister,
    key: 'register',
    invalidMessage: 'Should has at least one uppercase and one lowercase character'
  }];

  public username: FormControl = new FormControl('', this.usernameValidators.map(({ fn }) => fn));
  public password: FormControl = new FormControl('', this.passwordValidators.map(({ fn }) => fn));

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.createForm();
  }

  createForm() {
    this.authForm = this.formBuilder.group({
        username: this.username,
        password: this.password,
      });
  }

  validateCharsRegister({ value }: AbstractControl): ValidationErrors | null {
    if (typeof value === 'string' && value) {
      const isValid = value !== value.toLowerCase() && value !== value.toUpperCase();

      return isValid ? null : { register: true };
    }

    return null;
  }

  private showErrors(): void {
    const controls = this.authForm.controls;
    Object.keys(controls).forEach(controlName => controls[controlName].markAsDirty());
  }

  handleSubmitClick(): void {
    if (this.authForm.valid) {
      this.tryLogin();
    } else {
      this.showErrors();
    }
  }

  async tryLogin() {
    try {
      await this.authService.login(this.username.value);
    } catch (err) {
      // ToDo: handle auth error
    }
  }
}
