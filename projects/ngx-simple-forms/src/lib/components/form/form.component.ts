import {
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormElement, getFormElementComponentByType } from './form.elements';
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
  @Input() elements: { [key: string]: FormElement } = {};

  @ViewChildren('dynamicComponentElementContainer', { read: ViewContainerRef })
  dynamicComponentElementContainer!: QueryList<ViewContainerRef>;

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

  private getElements() {
    return Object.keys(this.elements).map((key, index) => {
      return { key, element: this.elements[key], index };
    });
  }

  private createFormControls() {
    this.getElements().forEach(({ key, element }) => {
      const formControl = element.formControl ?? new FormControl();

      this.form.addControl(key, formControl);
      element.formControl = formControl;
    });
  }

  private createComponents() {
    this.getElements().forEach(({ key, element, index }) => {
      const container = this.dynamicComponentElementContainer.get(index);

      if (!container) {
        return;
      }

      container.clear();

      const componentType = getFormElementComponentByType(element.type);
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(componentType);
      const componentRef = container.createComponent(componentFactory);

      componentRef.instance.params = element.params;
      componentRef.instance.formControl =
        element.formControl ?? new FormControl();
      componentRef.changeDetectorRef.detectChanges();

      element.componentRef = componentRef;
    });
  }

  private createCheckTimer() {
    if (this.checkTimer <= 0 || !this.checkTimer) {
      return;
    }

    setInterval(() => {
      this.fnDisableElements();
    }, this.checkTimer);
  }

  private createValueListener() {
    this.getElements().forEach(({ element }) => {
      element.formControl?.valueChanges.subscribe(() => {
        element.value = element.formControl?.value;
      });

      if (typeof element.value !== 'undefined') {
        element.formControl?.setValue(element.value);
      }
    });
  }

  private createDisabledListener() {
    this.fnDisableElements();

    this.form.valueChanges.subscribe(() => {
      this.fnDisableElements();
    });

    this.form.statusChanges.subscribe(() => {
      this.fnDisableElements();
    });
  }

  private createHiddenListenerDefaultFn() {
    const elements = this.getElements();

    for (const data of elements) {
      const element = data.element;

      if (typeof element.hidden !== 'undefined') {
        return;
      }

      element.hidden = () => false;
    }
  }

  private fnDisableElements() {
    const elements = this.getElements();

    for (const data of elements) {
      const element = data.element;

      if (typeof element.disabled !== 'function') {
        return;
      }

      const disabled = element.disabled();

      if (disabled) {
        element.formControl?.disable({ emitEvent: true, onlySelf: true });
      } else {
        element.formControl?.enable({ emitEvent: true, onlySelf: true });
      }
    }
  }

  public detectChanges() {
    this.getElements().forEach(({ element }) => {
      element.componentRef?.changeDetectorRef?.detectChanges?.();
    });
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
