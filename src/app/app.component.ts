import { Component } from '@angular/core';
import { SimpleFormsService } from 'ngx-simple-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngx-simple-forms-workspace';

  constructor(private service: SimpleFormsService) {}

  ngOnInit(): void {
    this.service.createDialogForm({
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
    });
  }
}
