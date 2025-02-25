import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseParameters } from './base.parameters';
import { addGetterSetter } from '../../../utils';

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

  public changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {}

  protected detectChangesWithSetterWidth() {
    addGetterSetter<string>(this.params, 'width', (oldValue, newValue) => {
      if (oldValue === newValue) {
        return;
      }

      this.changeDetectorRef.detectChanges();
    });
  }
}
