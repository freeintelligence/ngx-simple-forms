import { FormControl, ValidatorFn } from '@angular/forms';
import { BaseComponent } from '../elements/base/base.component';
import { InputComponent } from '../elements/input/input.component';
import { InputParameters } from '../elements/input/input.parameters';
import { SelectComponent } from '../elements/select/select.component';
import { SelectParameters } from '../elements/select/select.parameters';
import { ButtonComponent } from '../elements/button/button.component';
import { ButtonParameters } from '../elements/button/button.parameters';
import { ComponentRef } from '@angular/core';

export type BaseFormElementValidator = [ValidatorFn, string];

export type BaseFormElement<T> = {
  disabled?: () => boolean | undefined;
  hidden?: () => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
  validators?: BaseFormElementValidator[];
  params?: T;
};

export type FormElement<T = unknown> =
  | (BaseFormElement<T> & { type: 'input'; params: InputParameters })
  | (BaseFormElement<T> & { type: 'select'; params: SelectParameters })
  | (BaseFormElement<T> & { type: 'button'; params: ButtonParameters });

export function getFormElementComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
    button: ButtonComponent,
  };

  return typesComponent[type];
}
