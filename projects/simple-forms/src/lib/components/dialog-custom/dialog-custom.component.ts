import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '../../interfaces/field.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';
import { ButtonPresubmit } from '../../interfaces/button.interface';
import { Submit } from '../../interfaces/submit.interface';

export interface InputData {
  header?: CustomHeader;
  message?: string;
  fields: { [key: string]: Field } | Field[];
  fieldHiddenParams: any[];
  buttons?: ButtonPresubmit[];
  submit?: Submit;
}

@Component({
  selector: 'simple-forms-dialog-custom',
  templateUrl: './dialog-custom.component.html',
  styleUrls: ['./dialog-custom.component.css']
})
export class DialogCustomComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InputData) { }

  ngOnInit(): void {
  }

}
