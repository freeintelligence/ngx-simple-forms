import { Component, Inject, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogParameters } from './dialog.parameters';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'ngx-simple-forms-dialog',
  standalone: true,
  imports: [FormComponent, MatDialogModule, MatToolbarModule, NgIf, NgStyle],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @ViewChild(FormComponent) form!: FormComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public parameters: DialogParameters,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}
}
