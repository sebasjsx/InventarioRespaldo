import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SidebarComponent,
    InputPasswordComponent,
    ListTableComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    RouterLink,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    TranslateModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  exports: [
    SidebarComponent,
    InputPasswordComponent,
    ListTableComponent,
  ]
})
export class SharedModule { }
