import { Component, OnInit } from '@angular/core';
import { SimpleFormsService } from 'ngx-simple-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ngx-simple-forms-workspace';

  constructor(private service: SimpleFormsService) {

  }

  ngOnInit(): void {
    this.service.createDialogForm({
      header: {
        title: 'Formulario',
      },
      message: 'veamos si funciona el mensaje',
      buttons: [
        { text: 'Enviar', tooltip: '', color: 'primary', },
      ],
      fields: {
        name: {
          key: 'name',
          placeholder: 'Ingresa el nombre',
        }
      }
    })
  }

}
