import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../interfaces/field.interface';

@Component({
  selector: 'simple-forms-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input('field') field: Field;

  constructor() { }

  ngOnInit(): void {
  }

}
