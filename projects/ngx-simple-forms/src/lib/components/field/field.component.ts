import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Injector,
  Optional,
  Host,
  SkipSelf,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ControlContainer,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'simple-forms-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit, ControlValueAccessor {
  @Input('field') field!: Field;
  @Input('required') required!: boolean;
  @Input('disabled') disabled!: boolean;
  @Input('formControlName') formControlName!: string;
  @Input('hiddenParams') hiddenParams!: any[];

  public value: any;
  public control!: AbstractControl;
  public internalControl: FormControl = new FormControl(null, []);
  private onChange!: Function;
  private onTouched!: Function;

  constructor(
    private injector: Injector,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.typeRemoteSelect();

    if (this.controlContainer && this.formControlName) {
      this.control = this.controlContainer.control?.get(
        this.formControlName
      ) as AbstractControl;
    } else {
      const ngControl = this.injector.get(NgControl, null);

      if (ngControl && ngControl.control) {
        this.control = this.injector.get(NgControl).control as AbstractControl;
      }
    }

    this.internalControl.setValidators(
      this.field.validators instanceof Array ? this.field.validators : []
    );

    if (this.control) {
      this.internalControl.setValue(this.control.value);
      this.control.valueChanges.subscribe(() =>
        this.internalControl.updateValueAndValidity({
          onlySelf: true,
          emitEvent: true,
        })
      );
      this.control.valueChanges.subscribe((e) =>
        this.internalControl.setValue(e)
      );
      this.control.statusChanges.subscribe(() =>
        this.internalControl.updateValueAndValidity({
          onlySelf: true,
          emitEvent: true,
        })
      );

      this.setInitialDisabledState();
    } else {
      this.setDisabledState(this.disabled);
    }
  }

  triggerEvent(event: any) {
    const value = event?.target?.value;

    return this.setValue(value);
  }

  triggerEventForFiles(field: Field, event: any) {
    const value = field.typeFile?.multiple
      ? event.srcElement?.files
      : event.srcElement?.files[0];

    this.setValue(value);
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

  setInitialDisabledState() {
    if (!this.control) {
      return false;
    }

    if (this.field.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }

    return true;
  }

  originalOrder(): number {
    return 0;
  }

  handleSuffix() {
    if (this.field.suffix && typeof this.field.suffix.handle === 'function') {
      return this.field.suffix.handle(this.field);
    }
  }

  handlePrefix() {
    if (this.field.prefix && typeof this.field.prefix.handle === 'function') {
      return this.field.prefix.handle(this.field);
    }
  }

  hidden() {
    if (typeof this.field.hidden === 'function') {
      return this.field.hidden(...this.hiddenParams);
    }

    return false;
  }

  getNestedPropertyValue(obj: any, path?: string) {
    if (!path || path === '.' || path === '/' || path === '') {
      return obj;
    }

    return path.split('.').reduce((current: any, key) => {
      return current ? current[key] : undefined;
    }, obj);
  }

  async typeRemoteSelect() {
    if (this.field.type !== 'remoteSelect') {
      return;
    }

    if (!this.field.typeRemoteSelect?.endpoint) {
      return;
    }

    this.field.typeRemoteSelect.loading = true;

    try {
      this.field.typeRemoteSelect.options = [];

      const response = await firstValueFrom(
        this.http.get(this.field.typeRemoteSelect.endpoint)
      );
      const resources = this.getNestedPropertyValue(
        response,
        this.field.typeRemoteSelect.resourcesPath
      );
      const mutatedResources =
        typeof this.field.typeRemoteSelect.mutate === 'function'
          ? this.field.typeRemoteSelect.mutate(resources)
          : resources;

      for (const item of mutatedResources) {
        this.field.typeRemoteSelect.options.push({
          value: this.field.typeRemoteSelect.itemValuePath
            ? item[this.field.typeRemoteSelect.itemValuePath]
            : undefined,
          description: this.field.typeRemoteSelect.itemDescriptionPath
            ? item[this.field.typeRemoteSelect.itemDescriptionPath]
            : undefined,
        });
      }

      this.cdr.detectChanges();
    } catch (err) {}

    this.field.typeRemoteSelect.loading = false;
  }
}
