import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { SelectParameters } from './select.parameters';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'ngx-simple-forms-select',
  standalone: true,
  imports: [
    MatSelect,
    NgIf,
    MatFormField,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent extends BaseComponent implements OnInit {
  @Input() override params: SelectParameters = {};
  @Input() override formControl!: FormControl;

  override ngOnInit(): void {
    super.ngOnInit();

    this.detectChangesWithSetterWidth();
  }
}
