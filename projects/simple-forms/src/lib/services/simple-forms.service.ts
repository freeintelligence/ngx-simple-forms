import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent, InputData } from '../components/dialog-custom/dialog-custom.component';
import { DialogCustomArguments } from '../interfaces/dialog-custom-arguments.interface';

@Injectable({
  providedIn: 'root'
})
export class SimpleFormsService {

  constructor(private dialog: MatDialog) { }

  createDialogForm(argumentsData: DialogCustomArguments) {
    const data: DialogCustomArguments = {
      header: typeof argumentsData.header === 'object' && argumentsData.header !== null && argumentsData.header ? argumentsData.header : null,
      message: typeof argumentsData.message === 'string' && argumentsData.message.length ? argumentsData.message : null,
      fields: argumentsData.fields,
      fieldHiddenParams: argumentsData.fields instanceof Array ? argumentsData.fieldHiddenParams : [],
      buttons: argumentsData.buttons instanceof Array ? argumentsData.buttons : [],
      model: argumentsData.model,
      width: typeof argumentsData.width === 'string' ? argumentsData.width : '448px',
      disableClose: typeof argumentsData.disableClose === 'boolean' ? argumentsData.disableClose : false,
      hasBackdrop: typeof argumentsData.hasBackdrop === 'boolean' ? argumentsData.hasBackdrop : true,
      submit: typeof argumentsData.submit === 'object' && argumentsData.submit !== null ? argumentsData.submit : null,
    };

    const dialog = this.dialog.open(DialogCustomComponent, {
      width: data.width,
      data: {
        header: data.header,
        message: data.message,
        fields: data.fields,
        fieldHiddenParams: data.fieldHiddenParams,
        buttons: data.buttons,
        model: data.model,
        submit: data.submit,
      } as InputData,
      disableClose: data.disableClose,
      hasBackdrop: data.hasBackdrop,
    });

    return dialog;
  }

}
