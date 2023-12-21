import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface Field {
  key: string;
  // appearance?: 'legacy'|'standard'|'fill'|'outline';
  appearance?: MatFormFieldAppearance;
  width?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  requiredMessage?: string;
  validators?: any[];
  validatorMessages?: { [key: string]: string };
  defaultValue?: any;
  value?: any;
  suffix?: {
    icon?: string;
    text?: string;
    color?: 'primary' | 'warn' | 'accent';
    handle?: (field: Field) => void;
  };
  prefix?: {
    icon?: string;
    text?: string;
    color?: 'primary' | 'warn' | 'accent';
    handle?: (field: Field) => void;
  };
  hidden?: (...data: any) => boolean;
  type?: 'select' | 'input' | 'date' | 'file' | 'textarea' | 'remoteSelect';

  typeTextArea?: {
    rows?: number;
  };

  typeFile?: {
    accept?: string;
    multiple?: boolean;
    autofilled?: boolean;
  };

  typeSelect?: {
    options?: { value: any; description: string }[];
    multiple?: boolean;
  };

  typeRemoteSelect?: {
    loading?: boolean;
    endpoint?: string;
    resourcesPath?: string;
    itemValuePath?: string;
    itemDescriptionPath?: string;
    mutate?: (result: any) => {};
    options?: { value: any; description: string }[];
    multiple?: boolean;
  };

  typeInput?: {
    type?:
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week';
  };

  typeDate?: {};
}
