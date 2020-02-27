import { NgModule } from '@angular/core';
import { CustomComponent } from './components/custom/custom.component';
import { MaterialModule } from './material.module';
import { DialogCustomComponent } from './components/dialog-custom/dialog-custom.component';
import { SimpleFormsService } from './services/simple-forms.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomComponent, DialogCustomComponent],
  entryComponents: [CustomComponent, DialogCustomComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    SimpleFormsService,
  ]
})
export class SimpleFormsModule { }
