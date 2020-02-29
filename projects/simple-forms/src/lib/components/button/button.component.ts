import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../../interfaces/button.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'simple-forms-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input('button') button: Button;
  @Input('form') form: FormGroup;
  @Input('disabled') disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  handle() {
    if (typeof this.button.handle === 'function') {
      this.button.handle(this.form);
    }
  }

}
