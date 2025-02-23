import { Component, ViewChild } from '@angular/core';
import { SimpleFormsService } from 'ngx-simple-forms';
import {
  FormElement,
  FormElementsBase,
} from '../../projects/ngx-simple-forms/src/lib/components/form/form.fields';
import { Validators } from '@angular/forms';
import { FormButtons } from '../../projects/ngx-simple-forms/src/lib/components/form/form.buttons';
import { FormComponent } from '../../projects/ngx-simple-forms/src/lib/components/form/form.component';

type TipoDeObjeto<T> = {
  [clave: string]: T;
};

type Uno = {
  uno: string;
};

type Dos = {
  dos: string;
};

type Tres = {
  tres: string;
};

type ItemDelObjeto =
  | {
      type: 'uno';
      value: Uno;
    }
  | {
      type: 'dos';
      value: Dos;
    }
  | {
      type: 'tres';
      value: Tres;
    };

const objeto = {
  elemento1: { type: 'uno', value: { uno: 'uno' } },
  elemento2: { type: 'dos', value: { dos: 'dos' } },
  otroElemento: { type: 'tres', value: { tres: 'tres' } },
  otro: { type: 'dos', value: { dos: 'dos' } },
} satisfies Record<string, ItemDelObjeto>;

console.log(objeto['elemento1'].type, objeto.elemento1.value.uno);
console.log(objeto['otroElemento'].type, objeto['otroElemento'].value.tres);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(FormComponent) form!: FormComponent;

  changeInt = 0;
  loading = false;

  fields: { [key: string]: FormElementsBase<any> } = {
    name: {
      type: 'input',
      params: {
        label: 'Nombre',
        width: '50%',
      },
      disabled: () => this.changeInt === 3 || this.loading,
    },
    lastname: {
      type: 'input',
      params: {
        label: 'Apellido',
        width: '50%',
      },
      hidden: () => {
        const condition = this.changeInt === 5;
        const previousWidth = this.fields['name'].params.width;

        if (condition) {
          this.fields['name'].params.width = '100%';
        } else {
          this.fields['name'].params.width = '50%';
        }

        if (previousWidth !== this.fields['name'].params.width) {
          this.fields[
            'name'
          ].componentRef?.changeDetectorRef?.detectChanges?.();
        }

        return condition;
      },
      disabled: () => this.loading,
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
      disabled: () => this.loading,
    },
    reset: {
      type: 'button',
      params: {
        text: 'Reiniciar',
        variant: 'basic',
        width: '50%',
        type: 'button',
        color: 'accent',
      },
      disabled: () => this.loading,
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
          console.log('Enviado', form.value);
          this.loading = true;
          this.fields.submit.params.loading = true;
          this.fields['submit'].params.loading = true;
        },
      },
      disabled: () => this.loading,
    },
  };

  constructor(private service: SimpleFormsService) {}

  ngOnInit(): void {
    /* this.service.createDialogForm({
      header: {
        title: 'Formulario',
        color: 'primary',
      },
      message: 'veamos si funciona el mensaje',
      buttons: [{ text: 'Enviar', tooltip: '', color: 'primary' }],
      fields: {
        name: {
          key: 'name',
          type: 'input',
          placeholder: 'Nombre',
          label: 'Escribe el nombre',
          hidden: () => false,
        },
        pokemon: {
          key: 'pokemon',
          type: 'remoteSelect',
          placeholder: 'Pokemon',
          label: 'Selecciona un pokemon',
          hidden: () => false,
          typeRemoteSelect: {
            endpoint: 'https://pokeapi.co/api/v2/pokemon-species/',
            resourcesPath: 'results',
            itemValuePath: 'name',
            itemDescriptionPath: 'name',
            multiple: true,
          },
        },
      },
    }); */
  }
}
