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

  defaultStyles: Partial<CSSStyleDeclaration> = {};

  elements: MainFormElements = {
    name: {
      type: 'input',
      styles: {
        width: '30%',
      },
      params: {
        label: 'Nombre',
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
      styles: {
        width: '70%',
      },
      params: {
        label: 'Apellido',
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

        if (this.elements.name.styles) {
          this.elements.name.styles.width = condition ? '100%' : '30%';
        }

        return condition;
      },
      disabled: () => this.elements.submit.params.loading,
    },
    country: {
      type: 'select',
      styles: {
        width: '100%',
      },
      validators: [[Validators.required, 'El país es obligatorio']],
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
      styles: {
        width: '50%',
      },
      params: {
        text: 'Reiniciar',
        variant: 'basic',
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
      styles: {
        width: '50%',
      },
      params: {
        text: 'Enviar',
        variant: 'flat',
        type: 'submit',
        color: 'primary',
        handle: async (form) => {
          if (form.invalid) {
            return;
          }

          this.elements.submit.params.loading = true;
        },
      },
      disabled: () =>
        this.elements.submit.params.loading || this.form?.form?.invalid,
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
