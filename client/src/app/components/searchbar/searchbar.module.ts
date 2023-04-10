import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from './searchbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SearchbarComponent],
  declarations: [SearchbarComponent],
  providers: [],
})
export class SearchbarModule { }
