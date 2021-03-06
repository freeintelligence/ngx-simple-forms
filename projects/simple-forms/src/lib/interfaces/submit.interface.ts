import { ButtonSubmitSuccess } from './button.interface';

export interface Submit {
  url: string;
  method?: 'post'|'POST'|'get'|'GET'|'patch'|'PATCH'|'put'|'PUT'|'delete'|'DELETE';
  error?: {
    message?: string;
    handle?: (err: Error) => any;
  },
  success?: {
    message?: string;
    buttons?: ButtonSubmitSuccess[];
    handle?: (result: any) => any;
  }
}