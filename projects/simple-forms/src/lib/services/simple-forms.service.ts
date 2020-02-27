import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent, InputData } from '../components/dialog-custom/dialog-custom.component';
import { DialogArguments } from '../interfaces/dialog-arguments.interface';

@Injectable({
  providedIn: 'root'
})
export class SimpleFormsService {

  constructor(private dialog: MatDialog) { }

  createDialogForm(argumentsData: DialogArguments) {
    const data: DialogArguments = {
      header: typeof argumentsData.header === 'object' && argumentsData.header !== null && argumentsData.header ? argumentsData.header : null,
      message: typeof argumentsData.message === 'string' && argumentsData.message.length ? argumentsData.message : null,
      fields: argumentsData.fields,
      width: typeof argumentsData.width === 'string' ? argumentsData.width : '448px',
      disableClose: typeof argumentsData.disableClose === 'boolean' ? argumentsData.disableClose : false,
      hasBackdrop: typeof argumentsData.hasBackdrop === 'boolean' ? argumentsData.hasBackdrop : true,
    };

    const dialog = this.dialog.open(DialogCustomComponent, {
      width: data.width,
      data: {
        header: data.header,
        message: data.message,
        fields: data.fields,
      } as InputData,
      disableClose: data.disableClose,
      hasBackdrop: data.hasBackdrop,
    });

    return dialog;
  }

}
