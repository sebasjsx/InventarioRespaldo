import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductComponent } from './product.component';
import { ProductRoutinModule } from './product-routing.module';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
  imports: [
    ProductRoutinModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers:[]
})
export class ProductModule { }
