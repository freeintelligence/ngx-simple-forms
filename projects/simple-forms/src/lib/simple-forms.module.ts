import { NgModule } from '@angular/core';
import { CustomComponent } from './components/custom/custom.component';
import { MaterialModule } from './material.module';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { SimpleFormsService } from './services/simple-forms.service';

@NgModule({
  declarations: [CustomComponent, DialogFormComponent],
  entryComponents: [CustomComponent, DialogFormComponent],
  imports: [
    MaterialModule,
  ],
  exports: [],
  providers: [
    SimpleFormsService,
  ]
})
export class SimpleFormsModule { }
