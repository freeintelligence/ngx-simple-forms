export interface SimpleControl {
  key: string;
  width?: string;
  placeholder: string;
  type?: 'select'|'input'|'date';

  typeSelect?: {
    options?: { value: any, description: string }[];
    multiple?: boolean;
  }

  typeInput?: {
    type?:
      'button'|
      'checkbox'|
      'color'|
      'date'|
      'datetime-local'|
      'email'|
      'file'|
      'hidden'|
      'image'|
      'month'|
      'number'|
      'password'|
      'radio'|
      'range'|
      'reset'|
      'search'|
      'submit'|
      'tel'|
      'text'|
      'time'|
      'url'|
      'week';
  }

  typeDate?: {

  };

}