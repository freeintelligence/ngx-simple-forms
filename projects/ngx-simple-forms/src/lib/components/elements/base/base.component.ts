import {
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseParameters } from './base.parameters';
import { BaseFormElementValidator } from '../../form/form.elements';

@Component({
  selector: 'ngx-simple-forms-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent implements OnInit {
  @Input() params: BaseParameters = {};
  @Input() formControl!: FormControl;
  @Input() validators!: BaseFormElementValidator[];

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public injector: Injector
  ) {}

  ngOnInit(): void {}

  protected getErrorMessage(): string {
    for (const current of this.validators) {
      const validator = current[0];
      const message = current[1];
      const result = validator(this.formControl);

      if (result) {
        return message;
      }
    }

    return '';
  }
}
