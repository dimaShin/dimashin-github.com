import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlInputComponent} from './components/form-control-input/form-control-input.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginPageComponent,
    FormControlInputComponent,
  ]
})
export class AuthModule { }
