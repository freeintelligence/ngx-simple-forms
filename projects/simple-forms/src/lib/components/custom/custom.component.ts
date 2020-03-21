import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { ButtonPresubmit } from '../../interfaces/button.interface';
import { Submit } from '../../interfaces/submit.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'simple-forms-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  @Input('header') header: CustomHeader = {};
  @Input('message') message: string;
  @Input('fields') fields: { [key: string]: Field } | Field[] = {};
  @Input('fieldHiddenParams') fieldHiddenParams: any[] = [];
  @Input('buttons') buttons: ButtonPresubmit[] = [];
  @Input('model') model: any = {};
  @Input('submit') submit: Submit;

  form: FormGroup = new FormGroup({});
  submitLoading: boolean;
  submitSuccess: boolean;
  successResult: any;
  error: Error;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.createControls();
  }

  createControls() {
    if (!this.fields) {
      return false;
    }

    for (let key in this.fields) {
      const field: Field = this.fields[key];

      this.form.addControl(field.key, new FormControl(typeof this.model === 'object' && this.model !== null && typeof this.model[key] !== 'undefined' ? this.model[key] : field.defaultValue, field.validators instanceof Array ? field.validators : []));
    }
  }

  getFieldByKey(key: string): Field {
    if (!((this.fields instanceof Array) || (typeof this.fields === 'object' && this.fields !== null))) {
      return null;
    }

    for (const i in this.fields) {
      if ((this.fields[i] as Field).key === key) {
        return this.fields[i];
      }
    }

    return null;
  }

  hasFileField() {
    if (!((this.fields instanceof Array) || (typeof this.fields === 'object' && this.fields !== null))) {
      return false;
    }

    for (const key in this.fields) {
      if ((this.fields[key] as Field).type === 'file') {
        return true;
      }
    }

    return false;
  }

  hasSubmitHandleButton() {
    if (!((this.buttons instanceof Array) || (typeof this.buttons === 'object' && this.buttons !== null))) {
      return false;
    }

    for (const key in this.buttons) {
      if (typeof (this.buttons[key] as ButtonPresubmit).handle === 'function' && (this.buttons[key] as ButtonPresubmit).type === 'submit') {
        return true;
      }
    }

    return false;
  }

  async onSubmit() {
    if (typeof this.submit !== 'object' || this.submit === null) {
      return false;
    }

    let invalid = false;

    for (const key in this.form.controls) {
      this.form.controls[key].updateValueAndValidity({ emitEvent: true, onlySelf: true });
      const field = this.getFieldByKey(key);

      if (this.form.controls[key].invalid && field && (!field.hidden || !field.hidden())) {
        invalid = true;
      }
    }

    if (invalid) {
      return false;
    }

    if (typeof this.submit !== 'object' || this.submit === null) {
      return false;
    }

    if (typeof this.submit.url !== 'string' && !this.hasSubmitHandleButton()) {
      return console.warn('Submit url is not a valid string!');
    }

    this.submitLoading = true;
    this.submitSuccess = false;
    this.error = undefined;

    const formData: FormData = new FormData();
    const headers: HttpHeaders = new HttpHeaders();

    for (const key in this.form.controls) {
      const control = this.form.controls[key];
      formData.append(key, control.value);
    }

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    try {
      switch (typeof this.submit.method === 'string' && this.submit.method.length ? this.submit.method.toUpperCase() : 'GET') {
        case 'GET': {
          this.successResult = await this.http.get(this.submit.url, { params: this.form.value }).toPromise();
          break;
        }
        case 'PATCH': {
          if (this.hasFileField()) {
            this.successResult = await this.http.patch(this.submit.url, formData, { headers: headers }).toPromise();
          } else {
            this.successResult = await this.http.patch(this.submit.url, this.form.value).toPromise();
          }
          break;
        }
        case 'PUT': {
          if (this.hasFileField()) {
            this.successResult = await this.http.put(this.submit.url, formData, { headers: headers }).toPromise();
          } else {
            this.successResult = await this.http.put(this.submit.url, this.form.value).toPromise();
          }
          break;
        }
        case 'DELETE': {
          this.successResult = await this.http.delete(this.submit.url, { params: this.form.value }).toPromise();
          break;
        }
        case 'POST':
        default: {
          if (this.hasFileField()) {
            this.successResult = await this.http.post(this.submit.url, formData, { headers: headers }).toPromise();
          } else {
            this.successResult = await this.http.post(this.submit.url, this.form.value).toPromise();
          }
          break;
        }
      }

      this.submitSuccess = true;

      if (typeof this.submit === 'object' && this.submit !== null &&
        typeof this.submit.success === 'object' && this.submit.success !== null &&
        typeof this.submit.success.handle === 'function') {
        await this.submit.success.handle(this.successResult);
      }
    } catch (err) {
      this.error = err;

      if (typeof this.submit === 'object' && this.submit !== null &&
        typeof this.submit.error === 'object' && this.submit.error !== null &&
        typeof this.submit.error.handle === 'function') {
        await this.submit.error.handle(this.error);
      }
    }

    this.submitLoading = false;
  }

  originalOrder(): number {
    return 0;
  }

}
