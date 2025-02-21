import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseParameters } from './base.parameters';

@Component({
  selector: 'ngx-simple-forms-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {
  @Input() params: BaseParameters = {};
  @Input() formControl!: FormControl;
}
