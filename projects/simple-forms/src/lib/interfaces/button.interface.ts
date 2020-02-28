export interface Button {
  color?: 'primary'|'accent'|'warn';
  style?: 'raised'|'stroked'|'flat'|'icon'|'fab'|'mini-fab';
  type?: 'submit'|'button';
  text?: string;
  icon?: string;
  handle?: () => any;
}