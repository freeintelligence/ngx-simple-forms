import { CustomHeader } from './custom-header.interface';
import { Field } from './field.interface';

export interface DialogCustomArguments {
  header?: CustomHeader;
  message?: string;
  fields: { [key: string]: Field } | Field[];
  width?: string;
  disableClose?: boolean;
  hasBackdrop?: boolean;
}
