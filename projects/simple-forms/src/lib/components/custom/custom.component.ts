import { Component, OnInit, Input } from '@angular/core';
import { SimpleControl } from '../../interfaces/simple-control.interface';
import { CustomHeader } from '../../interfaces/custom-header.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'simple-forms-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  @Input('header') header: CustomHeader = {};
  @Input('message') message: string;
  @Input('controls') controls: { [key: string]: SimpleControl } | SimpleControl[] = {};

  form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.createControls();
  }

  createControls() {
    if (!this.controls) {
      return false;
    }

    for (let key in this.controls) {
      const control: SimpleControl = this.controls[key];

      this.form.addControl(control.key, new FormControl(null, []));
    }
  }

}
