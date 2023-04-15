import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchbarModule } from '../searchbar/searchbar.module';
import { TopbarComponent } from './topbar.component';

@NgModule({
  imports: [
    RouterModule,
    SearchbarModule,
    CommonModule
  ],
  exports: [TopbarComponent],
  declarations: [TopbarComponent],
  providers: [],
})
export class TopbarModule { }
