import { Component, OnInit, Input, forwardRef, Injector, Optional, Host, SkipSelf, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ControlContainer, AbstractControl, FormControl, NgModel } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'simple-forms-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FieldComponent), multi: true },
    { provide: MatFormFieldControl, useExisting: FieldComponent }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  internalControl: FormControl = new FormControl(null, []);

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

    this.internalControl.setValidators(this.field.validators);
    this.control.valueChanges.subscribe(() => this.internalControl.updateValueAndValidity({ onlySelf: true, emitEvent: true }));
    this.control.statusChanges.subscribe(() => this.internalControl.updateValueAndValidity({ onlySelf: true, emitEvent: true }));
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

  originalOrder(): number {
    return 0;
  }

}
