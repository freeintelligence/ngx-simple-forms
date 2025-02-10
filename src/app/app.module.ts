import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleFormsModule } from 'ngx-simple-forms';
import { InputComponent } from '../../projects/ngx-simple-forms/src/lib/components/fields/input/input.component';
import { FormComponent } from '../../projects/ngx-simple-forms/src/lib/components/form/form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleFormsModule,
    FormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
