import { FormGroup } from '@angular/forms';

type ButtonVariant =
  | 'basic'
  | 'raised'
  | 'flat'
  | 'icon'
  | 'stroked'
  | 'fab'
  | 'mini-fab';

type ButtonColor = 'primary' | 'accent' | 'warn';

export interface ButtonParametersHandleData<HandleExtraData> {
  group: FormGroup;
  extra?: HandleExtraData;
}

export interface ButtonParameters<HandleExtraData = unknown> {
  text?: string;
  type?: 'submit' | 'button';
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
  getExtra?: () => HandleExtraData;
  handle?: (data: ButtonParametersHandleData<HandleExtraData>) => Promise<void>;
}
