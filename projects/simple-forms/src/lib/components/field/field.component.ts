import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'simple-forms-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FieldComponent), multi: true },
  ],
})
export class FieldComponent implements OnInit, ControlValueAccessor {

  @Input('field') field: Field;

  public value: any;
  public disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor() { }

  ngOnInit(): void {
  }

  setValue(value: any) {
    console.log('!!!value', value);
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
