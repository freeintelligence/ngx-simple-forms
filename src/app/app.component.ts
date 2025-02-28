import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormElement } from 'ngx-simple-forms';
import { FormComponent } from 'ngx-simple-forms';
import { InputParameters } from 'ngx-simple-forms';
import { SelectParameters } from 'ngx-simple-forms';
import { ButtonParameters } from 'ngx-simple-forms';

type MainFormElements = {
  name: FormElement<InputParameters>;
  lastname: FormElement<InputParameters>;
  country: FormElement<SelectParameters>;
  reset: FormElement<ButtonParameters>;
  submit: FormElement<ButtonParameters>;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(FormComponent) form!: FormComponent;

  changeInt = 0;

  elements: MainFormElements = {
    name: {
      type: 'input',
      params: {
        label: 'Nombre',
        width: '50%',
      },
      validators: [
        [Validators.required, 'El nombre es obligatorio'],
        [
          Validators.minLength(3),
          'La longitud mínima permitida es de 3 caracteres',
        ],
        [
          Validators.maxLength(32),
          'La longitud máxima permitida es de 32 caracteres',
        ],
      ],
      disabled: () =>
        this.changeInt === 3 || this.elements.submit.params.loading,
    },
    lastname: {
      type: 'input',
      params: {
        label: 'Apellido',
        width: '50%',
      },
      validators: [
        [Validators.required, 'El apellido es obligatorio'],
        [
          Validators.minLength(3),
          'La longitud mínima permitida es de 3 caracteres',
        ],
        [
          Validators.maxLength(32),
          'La longitud máxima permitida es de 32 caracteres',
        ],
      ],
      hidden: () => {
        const condition = this.changeInt === 5;

        if (this.elements?.name?.params) {
          this.elements.name.params.width = condition ? '100%' : '50%';
        }

        return condition;
      },
      disabled: () => this.elements.submit.params.loading,
    },
    country: {
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
      disabled: () => this.elements.submit.params.loading,
    },
    reset: {
      type: 'button',
      params: {
        text: 'Reiniciar',
        variant: 'basic',
        width: '50%',
        type: 'button',
        color: 'accent',
        handle: async (form) => {
          form.reset();
        },
      },
      disabled: () => this.elements.submit.params.loading,
    },
    submit: {
      type: 'button',
      params: {
        text: 'Enviar',
        variant: 'flat',
        width: '50%',
        type: 'submit',
        color: 'primary',
        handle: async (form) => {
          if (form.invalid) {
            return;
          }

          this.elements.submit.params.loading = true;
        },
      },
      disabled: () => this.elements.submit.params.loading,
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
