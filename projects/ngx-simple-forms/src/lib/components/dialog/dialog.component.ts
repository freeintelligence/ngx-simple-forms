import { Component, Inject } from '@angular/core';
import { FormComponent } from '../form/form.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogParameters } from './dialog.parameters';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ngx-simple-forms-dialog',
  standalone: true,
  imports: [FormComponent, MatDialogModule, MatToolbarModule, NgIf],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public parameters: DialogParameters,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}
}
