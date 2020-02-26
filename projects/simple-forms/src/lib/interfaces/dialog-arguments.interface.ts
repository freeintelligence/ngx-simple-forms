import { SimpleControl } from './simple-control.interface';

export interface DialogArguments {
  title?: string;
  message?: string;
  controls: { [key: string]: SimpleControl } | SimpleControl[];
  width?: string;
  disableClose?: boolean;
  hasBackdrop?: boolean;
}
