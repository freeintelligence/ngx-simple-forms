import {
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormFields, getFormFieldComponentByType } from './form.fields';
import { KeyValue, KeyValuePipe, NgFor } from '@angular/common';
import { InputComponent } from '../fields/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../fields/select/select.component';

@Component({
  selector: 'ngx-simple-forms-form',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() fields: { [key: string]: FormFields } = {};
  @ViewChildren('dynamicComponentFieldContainer', { read: ViewContainerRef })
  dynamicComponentFieldContainer!: QueryList<ViewContainerRef>;

  form: FormGroup = new FormGroup({});

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.createFields();

    setInterval(() => {
      console.log('form', this.form.value);
    }, 2000);
  }

  createFields() {
    const fieldKeys = Object.keys(this.fields);

    this.dynamicComponentFieldContainer.forEach((container, index) => {
      container.clear();

      const componentType = getFormFieldComponentByType(
        this.fields[fieldKeys[index]].type
      );
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(componentType);
      const componentRef = container.createComponent(componentFactory);
      const formControl = new FormControl();

      this.form.addControl(fieldKeys[index], formControl);

      componentRef.instance.params = this.fields[fieldKeys[index]].params;
      componentRef.instance.formControl = formControl;
      componentRef.changeDetectorRef.detectChanges();
    });
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
