import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutinModule } from './category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutinModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  exports: [
    CategoryComponent
  ],
  declarations: [
    CategoryComponent
  ],
  providers: [
  ],
})
export class CategoryModule { }