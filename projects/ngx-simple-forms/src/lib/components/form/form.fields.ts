import { FormControl } from '@angular/forms';
import { BaseComponent } from '../fields/base/base.component';
import { InputComponent } from '../fields/input/input.component';
import { InputParameters } from '../fields/input/input.parameters';
import { SelectComponent } from '../fields/select/select.component';
import { SelectParameters } from '../fields/select/select.parameters';
import { ButtonComponent } from '../fields/button/button.component';
import { ButtonParameters } from '../fields/button/button.parameters';
import { ComponentRef } from '@angular/core';

type BaseFormElement = {
  disabled?: () => boolean;
  hidden?: () => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
};

type FormElementMap = {
  input: BaseFormElement & { type: 'input'; params: InputParameters };
  select: BaseFormElement & { type: 'select'; params: SelectParameters };
  button: BaseFormElement & { type: 'button'; params: ButtonParameters };
};

export type FormElement = FormElementMap[keyof FormElementMap];

export type FormElements<T extends 'input' | 'select' | 'button' = any> = {
  type: T;
  params: T extends 'input'
    ? InputParameters
    : T extends 'select'
    ? SelectParameters
    : T extends 'button'
    ? ButtonParameters
    : never;
} & BaseFormElement;

export function getFormFieldComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
    button: ButtonComponent,
  };

  return typesComponent[type];
}
