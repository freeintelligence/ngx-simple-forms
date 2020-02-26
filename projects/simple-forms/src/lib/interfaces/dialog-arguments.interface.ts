import { SimpleControl } from './simple-control.interface';
import { CustomHeader } from './custom-header.interface';

export interface DialogArguments {
  header?: CustomHeader;
  message?: string;
  controls: { [key: string]: SimpleControl } | SimpleControl[];
  width?: string;
  disableClose?: boolean;
  hasBackdrop?: boolean;
}
