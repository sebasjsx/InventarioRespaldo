import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent} from './purchase.component'
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [PurchaseComponent],
  exports: [PurchaseComponent],
  imports: [
    PurchaseRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule
  ],
  providers:[]
})
export class PurchaseModule { }
