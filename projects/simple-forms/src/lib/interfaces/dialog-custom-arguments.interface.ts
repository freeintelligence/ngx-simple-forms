import { CustomHeader } from './custom-header.interface';
import { Field } from './field.interface';
import { ButtonPresubmit } from './button.interface';
import { Submit } from './submit.interface';

export interface DialogCustomArguments {
  header?: CustomHeader;
  message?: string;
  fields: { [key: string]: Field } | Field[];
  buttons?: ButtonPresubmit[];
  width?: string;
  disableClose?: boolean;
  hasBackdrop?: boolean;
  submit?: Submit;
}
