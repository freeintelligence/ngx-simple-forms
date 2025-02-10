export interface SelectParameters {
  label?: string;
  name?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  options?: { value: string; description: string }[];
}
