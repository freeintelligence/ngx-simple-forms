type ButtonVariant =
  | 'basic'
  | 'raised'
  | 'flat'
  | 'icon'
  | 'stroked'
  | 'fab'
  | 'mini-fab';

type ButtonColor = 'primary' | 'accent' | 'warn';

export interface ButtonParameters {
  width?: string;
  text?: string;
  type?: 'submit' | 'button';
  variant?: ButtonVariant;
  color?: ButtonColor;
}
