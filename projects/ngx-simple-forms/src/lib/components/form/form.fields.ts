import { BaseComponent } from '../fields/base/base.component';
import { InputComponent } from '../fields/input/input.component';
import { InputParameters } from '../fields/input/input.parameters';
import { SelectComponent } from '../fields/select/select.component';
import { SelectParameters } from '../fields/select/select.parameters';

export type FormFields =
  | { type: 'input'; width?: string; params: InputParameters }
  | { type: 'select'; width?: string; params: SelectParameters };

export function getFormFieldComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
  };

  return typesComponent[type];
}
