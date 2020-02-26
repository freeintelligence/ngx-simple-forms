import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent } from '../components/dialog-custom/dialog-custom.component';
import { DialogArguments } from '../interfaces/dialog-arguments.interface';

@Injectable({
  providedIn: 'root'
})
export class SimpleFormsService {

  constructor(private dialog: MatDialog) { }

  createDialogForm(argumentsData: DialogArguments) {
    const data: DialogArguments = {
      title: typeof argumentsData.title === 'string' && argumentsData.title.length ? argumentsData.title : null,
      message: typeof argumentsData.message === 'string' && argumentsData.message.length ? argumentsData.message : null,
      controls: argumentsData.controls instanceof Array ? argumentsData.controls : [],
      width: typeof argumentsData.width === 'string' ? argumentsData.width : '332px',
      disableClose: typeof argumentsData.disableClose === 'boolean' ? argumentsData.disableClose : false,
      hasBackdrop: typeof argumentsData.hasBackdrop === 'boolean' ? argumentsData.hasBackdrop : true,
    };

    const dialog = this.dialog.open(DialogCustomComponent, {
      width: data.width,
      data: {
        title: data.title,
        message: data.message,
        controls: data.controls,
      },
      disableClose: data.disableClose,
      hasBackdrop: data.hasBackdrop,
    });

    return dialog;
  }

}
