import { FormElement } from '../form/form.elements';

export interface DialogParameters {
  title?: string;
  color?: 'primary' | 'accent' | 'warn';
  description?: {
    text: string;
    styles?: Partial<CSSStyleDeclaration>;
  };
  checkTimer?: number;
  elements: { [key: string]: FormElement };
  defaultStyles?: Partial<CSSStyleDeclaration>;
}
