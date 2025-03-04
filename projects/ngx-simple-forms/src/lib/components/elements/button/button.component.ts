import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BaseComponent } from '../base/base.component';
import { ButtonParameters } from './button.parameters';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
export class ButtonComponent extends BaseComponent implements OnInit {
  @Input() override params: ButtonParameters = {};
  @Input() override formControl!: FormControl;

  public isDisabled = false;

  override ngOnInit(): void {
    super.ngOnInit();

    this.registerOnDisabledChange();
  }

  private registerOnDisabledChange() {
    this.formControl.registerOnDisabledChange((isDisabled) => {
      this.isDisabled = isDisabled;
    });
  }

  public async onClick(event: Event) {
    if (typeof this.params.handle !== 'function') {
      return;
    }

    const parentForm = this.formControl.parent as FormGroup;

    if (this.params.type === 'submit') {
      parentForm.markAllAsTouched();
    }

    await this.params.handle(parentForm);

    this.formControl.setValue(this.formControl.value, {
      emitEvent: true,
      onlySelf: false,
    });
  }
}
