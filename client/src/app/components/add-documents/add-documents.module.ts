import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { AddDocumentsComponent } from './add-documents.component';

@NgModule({
  imports: [UniDirectivesModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AddDocumentsComponent],
  declarations: [AddDocumentsComponent],
  providers: [],
})
export class AddDocumentsModule { }
