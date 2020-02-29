import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Button } from '../../interfaces/button.interface';
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
  @Input('buttons') buttons: Button[] = [];
  @Input('submit') submit: Submit;

  form: FormGroup = new FormGroup({});
  submitLoading: boolean;
  submitSuccess: boolean;
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
      let result: any;

      switch (typeof this.submit.method === 'string' && this.submit.method.length ? this.submit.method.toUpperCase() : 'GET') {
        case 'GET': {
          result = await this.http.get(this.submit.url, { params: this.form.value }).toPromise();
          break;
        }
        case 'PATCH': {
          result = await this.http.patch(this.submit.url, this.form.value).toPromise();
          break;
        }
        case 'PUT': {
          result = await this.http.put(this.submit.url, this.form.value).toPromise();
          break;
        }
        case 'DELETE': {
          result = await this.http.delete(this.submit.url, { params: this.form.value }).toPromise();
          break;
        }
        case 'POST':
        default: {
          result = await this.http.post(this.submit.url, this.form.value).toPromise();
          break;
        }
      }

      this.submitSuccess = true;
    } catch (err) {
      this.error = err;
    }

    this.submitLoading = false;
  }

  originalOrder(): number {
    return 0;
  }

}
