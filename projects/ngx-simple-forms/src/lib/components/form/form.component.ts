import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
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
    this.dynamicComponentFieldContainer.forEach((container) => {
      container.clear();

      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(InputComponent);
      const componentRef = container.createComponent(componentFactory);
    });
    console.log(
      'dynamicComponentFieldContainer',
      this.dynamicComponentFieldContainer
    );
  }

  originalOrderFn = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    return 0;
  };
}
