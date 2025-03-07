import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DatepickerParameters,
  DialogService,
  FormElement,
  FormComponent,
  InputParameters,
  SelectParameters,
  ButtonParameters,
  RemoteSelectParameters,
} from 'ngx-simple-forms';

type MainFormElements = {
  name: FormElement<InputParameters>;
  lastname: FormElement<InputParameters>;
  remoteCountry: FormElement<RemoteSelectParameters>;
  country: FormElement<SelectParameters>;
  date: FormElement<DatepickerParameters>;
  reset: FormElement<ButtonParameters>;
  submit: FormElement<ButtonParameters>;
  openDialog: FormElement<ButtonParameters>;
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
      disabled: () =>
        this.elements.submit.params.loading ||
        this.elements.lastname.hidden?.(),
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
    remoteCountry: {
      type: 'remote-select',
      styles: {
        width: '100%',
      },
      validators: [[Validators.required, 'El país remoto es obligatorio']],
      params: {
        label: 'País remoto',
        service: {
          url: () => `https://restcountries.com/v3.1/all`,
          method: 'GET',
          keys: {
            value: 'cca3',
            description: 'name.common',
          },
        },
        defaultOptions: [{ description: 'Todos' }],
      },
      disabled: () => this.elements.submit.params.loading,
    },
    date: {
      type: 'datepicker',
      params: {
        label: 'Fecha exclusiva',
        placeholder: 'Con placeholder',
      },
      validators: [[Validators.required, 'La fecha es obligatoria']],
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
        handle: async ({ group }) => {
          group.reset();
        },
      },
      tooltip: {
        message: `    <div style="width: 256px; background-color: red;">
      <span>Codigo de ejemplo</span>
    </div>`,
        position: 'above',
        withHtml: true,
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
        handle: async ({ group }) => {
          console.log('Se envia el formulario', group);

          if (group.invalid) {
            return;
          }

          this.elements.submit.params.loading = true;
        },
      },
      disabled: () => {
        return this.elements.submit.params.loading || this.form?.group?.invalid;
      },
    },
    openDialog: {
      type: 'button',
      styles: {
        width: '100%',
      },
      params: {
        text: 'Abrir dialogo',
        variant: 'flat',
        type: 'button',
        color: 'warn',
        handle: async () => {
          const dialog = this.dialogService.open({
            title: {
              text: 'Formulario en diálogo',
            },
            description: {
              text: 'Este es un formulario en diálogo destinado para probar el componente de otra forma.',
              styles: {
                color: 'red',
              },
            },
            checkTimer: 256,
            elements: {
              name: {
                type: 'input',
                params: {
                  label: 'Nombre',
                  type: 'text',
                },
                validators: [
                  [Validators.required, 'El nombre es obligatorio'],
                  [
                    Validators.minLength(3),
                    'El nombre debe tener al menos 3 caracteres',
                  ],
                  [
                    Validators.maxLength(32),
                    'El nombre debe tener como máximo 32 caracteres',
                  ],
                ],
              },
              cancel: {
                type: 'button',
                params: {
                  color: 'warn',
                  variant: 'basic',
                  text: 'Cancelar',
                  type: 'button',
                  handle: async () => {
                    dialog.close();
                  },
                },
                styles: {
                  marginTop: '16px',
                  width: '50%',
                },
              },
              submit: {
                type: 'button',
                params: {
                  color: 'primary',
                  variant: 'raised',
                  text: 'Crear',
                  type: 'submit',
                  handle: async ({ group }) => {
                    if (group.invalid) {
                      return;
                    }

                    dialog.close();
                  },
                },
                styles: {
                  marginTop: '16px',
                  width: '50%',
                },
              },
            },
            defaultStyles: {},
          });
        },
      },
    },
  };

  constructor(private readonly dialogService: DialogService) {}
}
