import { NgModule } from '@angular/core';
import { CustomComponent } from './components/custom/custom.component';
import { MaterialModule } from './material.module';
import { DialogCustomComponent } from './components/dialog-custom/dialog-custom.component';
import { SimpleFormsService } from './services/simple-forms.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldComponent } from './components/field/field.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    CustomComponent,
    DialogCustomComponent,
    FieldComponent,
    ButtonComponent,
  ],
  exports: [CustomComponent, FieldComponent, ButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialFileInputModule,
  ],
  providers: [SimpleFormsService],
})
export class SimpleFormsModule {}
