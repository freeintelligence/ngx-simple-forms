import { Component, OnInit, Input, forwardRef, Injector, Optional, Host, SkipSelf, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ControlContainer, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'simple-forms-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FieldComponent), multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit, ControlValueAccessor {
  
  @Input('field') field: Field;
  @Input('required') required: boolean;
  @Input('formControlName') formControlName: string;

  public value: any;
  public control: AbstractControl;
  public internalControl: FormControl = new FormControl(null, []);
  private isDisabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor(private injector: Injector, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    } else {
      const ngControl = this.injector.get(NgControl, null);

      if (ngControl && ngControl.control) {
        this.control = this.injector.get(NgControl).control;
      }
    }

    this.internalControl.setValidators(this.field.validators instanceof Array ? this.field.validators : []);

    if (this.control) {
      this.control.valueChanges.subscribe(() => this.internalControl.updateValueAndValidity({ onlySelf: true, emitEvent: true }));
      this.control.statusChanges.subscribe(() => this.internalControl.updateValueAndValidity({ onlySelf: true, emitEvent: true }));

      this.setInitialDisabledState(this.field.disabled);
    } else {
      this.setDisabledState(this.disabled);
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

    if (this.internalControl) {
      if (isDisabled) {
        this.internalControl.disable();
      } else {
        this.internalControl.enable();
      }
    }
  }

  setInitialDisabledState(isDisabled: boolean) {
    if (!this.control) {
      return false;
    }

    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  set disabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;

    if (isDisabled && this.control) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  get disabled(): boolean {
    return this.isDisabled;
  }

  originalOrder(): number {
    return 0;
  }

}
