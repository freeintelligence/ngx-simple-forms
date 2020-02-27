import { Component, OnInit, Input } from '@angular/core';
import { Control } from '../../interfaces/control.interface';

@Component({
  selector: 'simple-forms-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  @Input('control') control: Control;

  constructor() { }

  ngOnInit(): void {
  }

}
