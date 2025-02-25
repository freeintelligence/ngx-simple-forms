import { Component, ViewChild } from '@angular/core';
import { FormElement } from 'ngx-simple-forms';
import { FormComponent } from 'ngx-simple-forms';
import { InputParameters } from 'ngx-simple-forms';
import { SelectParameters } from 'ngx-simple-forms';
import { ButtonParameters } from 'ngx-simple-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(FormComponent) form!: FormComponent;

  changeInt = 0;
  loading = false;

  elements = {
    name: <FormElement<InputParameters>>{
      type: 'input',
      params: {
        label: 'Nombre',
        width: '50%',
      },
      disabled: () =>
        this.changeInt === 3 ||
        (this.form.elements['submit'].params as ButtonParameters).loading,
    },
    lastname: <FormElement<InputParameters>>{
      type: 'input',
      params: {
        label: 'Apellido',
        width: '50%',
      },
      hidden: () => {
        const condition = this.changeInt === 5;

        if (this.elements?.name?.params) {
          this.elements.name.params.width = condition ? '100%' : '50%';
        }

        return condition;
      },
      disabled: () =>
        (this.form.elements['submit'].params as ButtonParameters).loading,
    },
    country: <FormElement<SelectParameters>>{
      type: 'select',
      value: 'chi',
      params: {
        label: 'País',
        options: [
          { value: 'arg', description: 'Argentina' },
          { value: 'bra', description: 'Brasil' },
          { value: 'col', description: 'Colombia' },
          { value: 'chi', description: 'Chile' },
          { value: 'per', description: 'Peru' },
        ],
      },
      disabled: () =>
        (this.form.elements['submit'].params as ButtonParameters).loading,
    },
    reset: <FormElement<ButtonParameters>>{
      type: 'button',
      params: {
        text: 'Reiniciar',
        variant: 'basic',
        width: '50%',
        type: 'button',
        color: 'accent',
      },
      disabled: () =>
        (this.form.elements['submit'].params as ButtonParameters).loading,
    },
    submit: <FormElement<ButtonParameters>>{
      type: 'button',
      params: {
        text: 'Enviar',
        variant: 'flat',
        width: '50%',
        type: 'submit',
        color: 'primary',
        handle: async (form) => {
          this.elements.submit.params.loading = true;
          this.elements.submit.params.loading = true;
        },
      },
      disabled: () =>
        (this.form.elements['submit'].params as ButtonParameters).loading,
    },
  } satisfies Record<string, FormElement>;

  constructor() {}

  ngOnInit(): void {}
}
