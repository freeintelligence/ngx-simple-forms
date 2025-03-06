import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { DatepickerParameters } from './datepicker.parameters';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ngx-simple-forms-datepicker',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
})
export class DatepickerComponent extends BaseComponent implements OnInit {
  @Input() override params: DatepickerParameters = {};
  @Input() override formControl!: FormControl;

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
