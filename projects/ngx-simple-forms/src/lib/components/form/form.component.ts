import {
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormFields, getFormFieldComponentByType } from './form.fields';
import { FormButtons } from './form.buttons';
import { KeyValue, KeyValuePipe, NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-simple-forms-form',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() checkTimer = 0;
  @Input() fields: { [key: string]: FormFields } = {};
  @Input() buttons: { [key: string]: FormButtons } = {};

  @ViewChildren('dynamicComponentFieldContainer', { read: ViewContainerRef })
  dynamicComponentFieldContainer!: QueryList<ViewContainerRef>;

  form: FormGroup = new FormGroup({});

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.createFormControls();
    this.createComponents();
    this.createCheckTimer();
    this.createDisabledListener();
    this.createValueListener();
    this.createHiddenListenerDefaultFn();
    this.detectChanges();
  }

  private getFields() {
    return Object.keys(this.fields).map((key, index) => {
      return { key, field: this.fields[key], index };
    });
  }

  private createFormControls() {
    this.getFields().forEach(({ key, field }) => {
      const formControl = field.formControl ?? new FormControl();

      this.form.addControl(key, formControl);
      field.formControl = formControl;
    });
  }

  private createComponents() {
    this.getFields().forEach(({ key, field, index }) => {
      const container = this.dynamicComponentFieldContainer.get(index);

      if (!container) {
        return;
      }

      container.clear();

      const componentType = getFormFieldComponentByType(field.type);
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(componentType);
      const componentRef = container.createComponent(componentFactory);

      componentRef.instance.params = field.params;
      componentRef.instance.formControl =
        field.formControl ?? new FormControl();
      componentRef.changeDetectorRef.detectChanges();

      field.componentRef = componentRef;
    });
  }

  private createCheckTimer() {
    if (this.checkTimer <= 0 || !this.checkTimer) {
      return;
    }

    setInterval(() => {
      this.fnDisableFields();
    }, this.checkTimer);
  }

  private createValueListener() {
    this.getFields().forEach(({ field }) => {
      field.formControl?.valueChanges.subscribe(() => {
        field.value = field.formControl?.value;
      });

      if (typeof field.value !== 'undefined') {
        field.formControl?.setValue(field.value);
      }
    });
  }

  private createDisabledListener() {
    this.fnDisableFields();

    this.form.valueChanges.subscribe(() => {
      this.fnDisableFields();
    });

    this.form.statusChanges.subscribe(() => {
      this.fnDisableFields();
    });
  }

  private createHiddenListenerDefaultFn() {
    this.getFields().forEach(({ field }) => {
      if (typeof field.hidden !== 'undefined') {
        return;
      }

      field.hidden = () => false;
    });
  }

  private fnDisableFields() {
    this.getFields().forEach(({ field }) => {
      if (typeof field.disabled !== 'function') {
        return;
      }

      const disabled = field.disabled();

      if (disabled) {
        field.formControl?.disable({ emitEvent: true, onlySelf: true });
      } else {
        field.formControl?.enable({ emitEvent: true, onlySelf: true });
      }
    });
  }

  private detectChanges() {
    this.getFields().forEach(({ field }) => {
      field.componentRef?.changeDetectorRef?.detectChanges?.();
    });
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
