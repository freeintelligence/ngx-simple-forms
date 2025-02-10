import { Component, Input } from '@angular/core';
import { InputParameters } from './input.parameters';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'ngx-simple-forms-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent extends BaseComponent {
  @Input() override params: InputParameters = {};
  @Input() override formControl!: FormControl;
}
