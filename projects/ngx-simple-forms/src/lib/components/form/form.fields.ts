import { BaseComponent } from '../fields/base/base.component';
import { InputComponent } from '../fields/input/input.component';
import { InputParameters } from '../fields/input/input.parameters';
import { SelectComponent } from '../fields/select/select.component';
import { SelectParameters } from '../fields/select/select.parameters';

type BaseField = {
  width?: string;
  appearance?: string;
  floatLabel?: string;
};

export type FormFields =
  | (BaseField & { type: 'input'; params: InputParameters })
  | (BaseField & { type: 'select'; params: SelectParameters });

export function getFormFieldComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
  };

  return typesComponent[type];
}
