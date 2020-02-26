import { Component, OnInit, Input } from '@angular/core';
import { SimpleControl } from '../../interfaces/simple-control.interface';

@Component({
  selector: 'simple-forms-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  @Input('header') header: any = {};
  @Input('controls') controls: { [key: string]: SimpleControl } | SimpleControl[] = {};

  constructor() { }

  ngOnInit(): void {
  }

}
