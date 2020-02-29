import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { ButtonPresubmit } from '../../interfaces/button.interface';
import { Submit } from '../../interfaces/submit.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'simple-forms-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  @Input('header') header: CustomHeader = {};
  @Input('message') message: string;
  @Input('fields') fields: { [key: string]: Field } | Field[] = {};
  @Input('buttons') buttons: ButtonPresubmit[] = [];
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

      this.form.addControl(field.key, new FormControl(null, field.validators instanceof Array ? field.validators : []));
    }
  }

  async onSubmit() {
    if (typeof this.submit !== 'object' || this.submit === null) {
      return false;
    }

    if (this.form.invalid) {
      for (const key in this.form.controls) {
        this.form.controls[key].updateValueAndValidity({ emitEvent: true, onlySelf: true });
      }
      return false;
    }

    if (typeof this.submit !== 'object' || this.submit === null) {
      return false;
    }

    if (typeof this.submit.url !== 'string') {
      return console.warn('Submit url is not a valid string!');
    }

    this.submitLoading = true;
    this.submitSuccess = false;
    this.error = undefined;

    try {
      switch (typeof this.submit.method === 'string' && this.submit.method.length ? this.submit.method.toUpperCase() : 'GET') {
        case 'GET': {
          this.successResult = await this.http.get(this.submit.url, { params: this.form.value }).toPromise();
          break;
        }
        case 'PATCH': {
          this.successResult = await this.http.patch(this.submit.url, this.form.value).toPromise();
          break;
        }
        case 'PUT': {
          this.successResult = await this.http.put(this.submit.url, this.form.value).toPromise();
          break;
        }
        case 'DELETE': {
          this.successResult = await this.http.delete(this.submit.url, { params: this.form.value }).toPromise();
          break;
        }
        case 'POST':
        default: {
          this.successResult = await this.http.post(this.submit.url, this.form.value).toPromise();
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
