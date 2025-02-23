import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BaseComponent } from '../base/base.component';
import { ButtonParameters } from './button.parameters';
import {
  MatButton,
  MatButtonModule,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'ngx-simple-forms-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent extends BaseComponent {
  @Input() override params: ButtonParameters = {};
  @Input() override formControl!: FormControl;

  public isDisabled = false;

  ngOnInit(): void {
    this.formControl.registerOnDisabledChange((isDisabled) => {
      this.isDisabled = isDisabled;
    });
  }

  public async onClick(event: Event) {
    if (typeof this.params.handle !== 'function') {
      return;
    }

    await this.params.handle(this.formControl.parent as FormGroup);

    this.formControl.setValue(this.formControl.value, {
      emitEvent: true,
      onlySelf: false,
    });
  }
}
