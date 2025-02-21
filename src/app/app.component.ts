import { Component } from '@angular/core';
import { SimpleFormsService } from 'ngx-simple-forms';
import { FormFields } from '../../projects/ngx-simple-forms/src/lib/components/form/form.fields';
import { Validators } from '@angular/forms';
import { FormButtons } from '../../projects/ngx-simple-forms/src/lib/components/form/form.buttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  changeInt = 0;

  fields: { [key: string]: FormFields } = {
    name: {
      type: 'input',
      params: {
        label: 'Nombre',
        width: '50%',
      },
      disabled: () => this.changeInt === 3,
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
    },
    submit: {
      type: 'button',
      params: {
        text: 'Enviar',
        variant: 'raised',
        width: '50%',
      },
    },
    reset: {
      type: 'button',
      params: {
        text: 'Reiniciar',
        variant: 'raised',
        width: '50%',
      },
    },
  };

  /* buttons: { [key: string]: FormButtons } = {
    submit: {
      type: 'submit',
      params: {
        label: 'Enviar',
        color: 'primary',
      },
      handle: (form) => {
        console.log('Enviado', form.value);
        this.buttons['submit'];
      },
    },
  }; */

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
