import { NgModule } from '@angular/core';
import { CustomComponent } from './components/custom/custom.component';
import { MaterialModule } from './material.module';
import { DialogCustomComponent } from './components/dialog-custom/dialog-custom.component';
import { SimpleFormsService } from './services/simple-forms.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldComponent } from './components/field/field.component';

@NgModule({
  declarations: [CustomComponent, DialogCustomComponent, FieldComponent],
  entryComponents: [CustomComponent, DialogCustomComponent, FieldComponent],
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
