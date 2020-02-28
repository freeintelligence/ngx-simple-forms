import { Component, OnInit, Input, forwardRef, Injector, Optional, Host, SkipSelf } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ControlContainer, AbstractControl } from '@angular/forms';

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
  @Input('required') required: boolean;
  @Input('formControlName') formControlName: string;

  public value: any;
  public disabled: boolean;
  public control: AbstractControl;
  public internalValue: any;
  private onChange: Function;
  private onTouched: Function;

  constructor(private injector: Injector, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    } else {
      const ngControl = this.injector.get(NgControl, null);

      if (ngControl.control) {
        this.control = this.injector.get(NgControl).control;
      }
    }
  }

  setValue(value: any) {
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
