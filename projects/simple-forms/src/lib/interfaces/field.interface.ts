import { Control } from './control.interface';

export interface Field {
  appearance?: 'legacy'|'standard'|'fill'|'outline';
  width?: string;
  label?: string;

  control: Control;
}
