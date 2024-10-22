import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { WineryComponent } from './winery.component';
import { WineryRoutinModule } from './winery-routing.module';

@NgModule({
  declarations: [WineryComponent],
  exports: [WineryComponent],
  imports: [
    WineryRoutinModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers:[]
})
export class WineryModule { }
