import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BaseComponent } from '../base/base.component';
import { ButtonParameters } from './button.parameters';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ngx-simple-forms-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    MatButton,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent extends BaseComponent {
  @Input() override params: ButtonParameters = {};
  @Input() override formControl!: FormControl;
}
