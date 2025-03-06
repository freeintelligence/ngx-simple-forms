import { FormControl, ValidatorFn } from '@angular/forms';
import { BaseComponent } from '../elements/base/base.component';
import { InputComponent } from '../elements/input/input.component';
import { InputParameters } from '../elements/input/input.parameters';
import { SelectComponent } from '../elements/select/select.component';
import { SelectParameters } from '../elements/select/select.parameters';
import { ButtonComponent } from '../elements/button/button.component';
import { ButtonParameters } from '../elements/button/button.parameters';
import { ComponentRef } from '@angular/core';
import { DatepickerParameters } from '../elements/datepicker/datepicker.parameters';
import { DatepickerComponent } from '../elements/datepicker/datepicker.component';
import { RemoteSelectParameters } from '../elements/remote-select/remote-select.parameters';
import { RemoteSelectComponent } from '../elements/remote-select/remote-select.component';

export type BaseFormElementValidator = [ValidatorFn, string];

export type BaseFormElement<T> = {
  disabled?: () => boolean | undefined;
  hidden?: () => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
  validators?: BaseFormElementValidator[];
  params?: T;
  styles?: Partial<CSSStyleDeclaration>;
};

export type FormElement<T = unknown> =
  | (BaseFormElement<T> & { type: 'input'; params: InputParameters })
  | (BaseFormElement<T> & { type: 'select'; params: SelectParameters })
  | (BaseFormElement<T> & { type: 'button'; params: ButtonParameters })
  | (BaseFormElement<T> & { type: 'datepicker'; params: DatepickerParameters })
  | (BaseFormElement<T> & {
      type: 'remote-select';
      params: RemoteSelectParameters;
    });

export function getFormElementComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
    button: ButtonComponent,
    datepicker: DatepickerComponent,
    'remote-select': RemoteSelectComponent,
  };

  return typesComponent[type];
}
