import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { DialogParameters } from './dialog.parameters';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  open(params: DialogParameters) {
    return this.dialog.open(DialogComponent, {
      width: '512px',
      autoFocus: true,
      data: params,
    });
  }
}
