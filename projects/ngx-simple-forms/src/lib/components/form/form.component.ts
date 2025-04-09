import {
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormElement, getFormElementComponentByType } from './form.elements';
import { KeyValue, KeyValuePipe, NgFor, NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addGetterSetter, deepClone } from '../../utils';
import { MatTooltipModule } from '@angular/material/tooltip';
import { interceptMatTooltipsMessage } from '../../browser';

@Component({
  selector: 'ngx-simple-forms-form',
  standalone: true,
  imports: [
    NgFor,
    KeyValuePipe,
    ReactiveFormsModule,
    NgStyle,
    MatTooltipModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent {
  private static IS_EXECUTED_TOOLTIP_INIT = false;

  @Input() checkTimer = 512;
  @Input() elements: { [key: string]: FormElement } = {};
  @Input() cloneElements = false;
  @Input() defaultStyles: Partial<CSSStyleDeclaration> = {};

  @ViewChildren('dynamicComponentElementContainer', { read: ViewContainerRef })
  dynamicComponentElementContainer!: QueryList<ViewContainerRef>;

  group: FormGroup = new FormGroup({});

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    this.executeTooltipInit();
  }

  ngAfterViewInit(): void {
    this.cloneElementsIfNeeded();
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

  private executeTooltipInit() {
    if (FormComponent.IS_EXECUTED_TOOLTIP_INIT) {
      return;
    }

    FormComponent.IS_EXECUTED_TOOLTIP_INIT = true;
    interceptMatTooltipsMessage();
  }

  private cloneElementsIfNeeded() {
    if (!this.cloneElements) {
      return;
    }

    this.elements = deepClone(this.elements);
  }

  private getElements() {
    return Object.keys(this.elements).map((key, index) => {
      return { key, element: this.elements[key], index };
    });
  }

  private createFormControls() {
    this.getElements().forEach(({ key, element }) => {
      const formControl = element.formControl ?? new FormControl();

      this.group.addControl(key, formControl);
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
      const componentRef = container.createComponent(componentType);

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

    this.group.valueChanges.subscribe(() => {
      this.fnDisableElements();
    });

    this.group.statusChanges.subscribe(() => {
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
        continue;
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

  onMouseOver(event: Event, element: FormElement) {
    if (typeof element.onMouseOver !== 'function') {
      return;
    }

    const extra = element.getOnExtra?.();

    element.onMouseOver?.(event, extra);
  }

  hidden(element: FormElement) {
    if (typeof element.hidden !== 'function') {
      return false;
    }

    const extra = element.getOnExtra?.();

    return element.hidden?.(extra);
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
