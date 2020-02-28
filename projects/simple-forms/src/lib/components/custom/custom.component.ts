import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../interfaces/field.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Button } from '../../interfaces/button.interface';
import { Submit } from '../../interfaces/submit.interface';

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

  constructor() { }

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

    console.log('onSubmit success!', this.form.value);
  }

  originalOrder(): number {
    return 0;
  }

}
