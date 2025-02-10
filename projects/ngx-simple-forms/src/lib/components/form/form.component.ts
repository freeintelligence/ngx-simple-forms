import {
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormFields } from './form.interfaces';
import { KeyValue, KeyValuePipe, NgFor } from '@angular/common';
import { InputComponent } from '../fields/input/input.component';

@Component({
  selector: 'ngx-simple-forms-form',
  standalone: true,
  imports: [NgFor, KeyValuePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() fields: { [key: string]: FormFields } = {};
  @ViewChildren('dynamicComponentFieldContainer', { read: ViewContainerRef })
  dynamicComponentFieldContainer!: QueryList<ViewContainerRef>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    /* setInterval(() => {
      console.log(
        'dynamicComponentFieldContainer',
        this.dynamicComponentFieldContainer
      );
    }, 200); */
  }

  ngAfterViewInit(): void {
    this.createFields();
  }

  createFields() {
    const fieldKeys = Object.keys(this.fields);

    this.dynamicComponentFieldContainer.forEach((container, index) => {
      container.clear();

      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(InputComponent);
      const componentRef = container.createComponent(componentFactory);
      componentRef.instance.params = this.fields[fieldKeys[index]].params;
    });
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
