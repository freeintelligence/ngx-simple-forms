import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleControl } from '../../interfaces/simple-control.interface';

export interface InputData {
  title?: string;
  message?: string;
  controls: { [key: string]: SimpleControl } | SimpleControl[];
}

@Component({
  selector: 'simple-forms-dialog-custom',
  templateUrl: './dialog-custom.component.html',
  styleUrls: ['./dialog-custom.component.css']
})
export class DialogCustomComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: InputData) { }

  ngOnInit(): void {
    console.log('data', this.data);
  }

}
