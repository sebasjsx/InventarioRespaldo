import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestorePasswordRoutingModule } from './restore-password.routing.module';
import { RestorePasswordComponent } from './restore-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RestorePasswordComponent  
  ],
  exports: [
    RestorePasswordComponent,
  ],
  imports: [
    CommonModule,
    RestorePasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    TranslateModule
  ]
})
export class RestorePasswordModule { }
