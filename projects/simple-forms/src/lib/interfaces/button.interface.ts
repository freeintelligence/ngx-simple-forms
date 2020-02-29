import { FormGroup } from '@angular/forms';

export interface Button {
  color?: 'primary'|'accent'|'warn';
  style?: 'raised'|'stroked'|'flat'|'icon'|'fab'|'mini-fab';
  type?: 'submit'|'button';
  text?: string;
  icon?: string;
  iconLeft?: boolean;
  handle?: (...data: any) => any;
}

export interface ButtonSubmitSuccess extends Button {
  handle?: (result: any) => any;
}

export interface ButtonPresubmit extends Button {
  handle?: (form: FormGroup) => any;
}