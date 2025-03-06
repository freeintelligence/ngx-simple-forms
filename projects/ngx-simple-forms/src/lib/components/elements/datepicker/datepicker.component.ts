import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { DatepickerParameters } from './datepicker.parameters';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatNativeDateModule,
    MatInputModule,
  ],
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
