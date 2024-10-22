import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,
    TranslateModule
  ],
  exports: [
    UnauthorizedComponent
  ],
  declarations: [
    UnauthorizedComponent
  ],
  providers: [
  ],
})
export class UnauthorizedModule { }