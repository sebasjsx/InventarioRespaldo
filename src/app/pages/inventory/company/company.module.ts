import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CompanyComponent } from './company.component';
import { CompanyRoutinModule } from './company-routing.module';



@NgModule({
  declarations: [CompanyComponent],
  exports: [CompanyComponent],
  imports: [
    CompanyRoutinModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers:[]
})
export class CompanyModule { }
