import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormElement, getFormElementComponentByType } from './form.elements';
import { KeyValue, KeyValuePipe, NgFor, NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addGetterSetter } from '../../utils';

@Component({
  selector: 'ngx-simple-forms-form',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ReactiveFormsModule, NgStyle],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() checkTimer = 0;
  @Input() elements: { [key: string]: FormElement } = {};
  @Input() defaultStyles: Partial<CSSStyleDeclaration> = {};

  @ViewChildren('dynamicComponentElementContainer', { read: ViewContainerRef })
  dynamicComponentElementContainer!: QueryList<ViewContainerRef>;

  form: FormGroup = new FormGroup({});

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.createFormControls();
    this.createFormControlValidators();
    this.mergeStyles();
    this.stylesListener();
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

  private createFormControlValidators() {
    this.getElements().forEach(({ key, element }) => {
      if (!element.validators?.length) {
        return;
      }

      const onlyValidators = element.validators.map(([validator]) => validator);

      element.formControl?.setValidators(onlyValidators);
      element.formControl?.updateValueAndValidity();
    });

    this.detectChanges();
  }

  private mergeStyles() {
    const baseStyles: Partial<CSSStyleDeclaration> = {
      padding: '12px',
    };

    const baseWithDefaultStyles = { ...baseStyles, ...this.defaultStyles };

    this.getElements().forEach(({ element, key }) => {
      if (typeof element.styles === 'undefined') {
        element.styles = { ...baseWithDefaultStyles };

        return;
      }

      const elementWithBaseWithDefaultStyles = {
        ...baseWithDefaultStyles,
        ...element.styles,
      };

      element.styles = elementWithBaseWithDefaultStyles;
    });

    this.changeDetectorRef.detectChanges();
  }

  private stylesListener() {
    this.getElements().forEach(({ element }) => {
      addGetterSetter<Partial<CSSStyleDeclaration>>(
        element,
        'styles',
        (oldValue, newValue) => {
          if (oldValue === newValue) {
            return;
          }

          this.changeDetectorRef.detectChanges();
        },
        true
      );
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
      componentRef.instance.validators = element.validators ?? [];
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

      const previous = element.formControl?.disabled;
      const disabled = element.disabled();

      if (!!previous === !!disabled) {
        continue;
      }

      if (disabled) {
        element.formControl?.disable({ emitEvent: true, onlySelf: true });
      } else {
        element.formControl?.enable({ emitEvent: true, onlySelf: true });
      }
    }
  }

  public detectChanges(
    includeElements: boolean = true,
    includeForm: boolean = true
  ) {
    if (includeElements) {
      this.getElements().forEach(({ element }) => {
        element.componentRef?.changeDetectorRef?.detectChanges?.();
      });
    }

    if (includeForm) {
      this.changeDetectorRef.detectChanges();
    }
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
