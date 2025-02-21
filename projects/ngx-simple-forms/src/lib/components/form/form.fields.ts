import { FormControl } from '@angular/forms';
import { BaseComponent } from '../fields/base/base.component';
import { InputComponent } from '../fields/input/input.component';
import { InputParameters } from '../fields/input/input.parameters';
import { SelectComponent } from '../fields/select/select.component';
import { SelectParameters } from '../fields/select/select.parameters';
import { ButtonComponent } from '../fields/button/button.component';
import { ButtonParameters } from '../fields/button/button.parameters';
import { ComponentRef } from '@angular/core';

type BaseField = {
  disabled?: () => boolean;
  hidden?: () => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
};

export type FormFields =
  | (BaseField & { type: 'input'; params: InputParameters })
  | (BaseField & { type: 'select'; params: SelectParameters })
  | (BaseField & { type: 'button'; params: ButtonParameters });

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
