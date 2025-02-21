import { FormGroup } from '@angular/forms';

export type FormButtons = {
  text: string;
  color: 'primary' | 'warn' | 'accent';
  type: 'submit' | 'button';
  tooltip?: string;
  icon?: string;
  iconLeft?: string;
  variant?: 'raised' | 'stroked' | 'flat' | 'icon';

};

import { FormControl } from '@angular/forms';
import { BaseComponent } from '../fields/base/base.component';
import { InputComponent } from '../fields/input/input.component';
import { InputParameters } from '../fields/input/input.parameters';
import { SelectComponent } from '../fields/select/select.component';
import { SelectParameters } from '../fields/select/select.parameters';
import { ComponentRef } from '@angular/core';

type BaseButton = {
  disabled?: () => boolean;
  hidden?: () => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
};

export type FormFields =
  | (BaseButton & { type: 'input'; params: InputParameters })
  | (BaseButton & { type: 'select'; params: SelectParameters });

export function getFormFieldComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
  };

  return typesComponent[type];
}
