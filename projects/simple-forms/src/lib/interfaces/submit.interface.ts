import { Button } from './button.interface';

export interface Submit {
  url: string;
  method: 'post'|'POST'|'get'|'GET'|'patch'|'PATCH'|'put'|'PUT'|'delete'|'DELETE';
  errorMessage?: string;
  successMessage?: string;
  buttons: Button[];
}