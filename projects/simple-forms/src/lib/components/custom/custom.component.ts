import { Component, OnInit, Input } from '@angular/core';
import { SimpleControl } from '../../interfaces/simple-control.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';

@Component({
  selector: 'simple-forms-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  @Input('header') header: CustomHeader = {};
  @Input('message') message: string;
  @Input('controls') controls: { [key: string]: SimpleControl } | SimpleControl[] = {};

  constructor() { }

  ngOnInit(): void {
    console.log('header', this.header);
  }

}
