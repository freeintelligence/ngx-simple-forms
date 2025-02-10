import { Component } from '@angular/core';
import { SimpleFormsService } from 'ngx-simple-forms';
import { FormFields } from '../../projects/ngx-simple-forms/src/lib/components/form/form.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fields: { [key: string]: FormFields } = {
    name: {
      type: 'input',
      params: {
        label: 'Nombre',
      },
    },
    lastname: {
      type: 'input',
      params: {
        label: 'Apellido',
      },
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
