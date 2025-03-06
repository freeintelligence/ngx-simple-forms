import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelectModule,
} from '@angular/material/select';
import {
  RemoteSelectOption,
  RemoteSelectParameters,
  RemoteSelectParametersServiceKeys,
} from './remote-select.parameters';
import { BaseComponent } from '../base/base.component';
import { RemoteSelectService } from './remote-select.service';
import { addGetterSetter, getDeepValue } from '../../../utils';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'ngx-simple-forms-remote-select',
  standalone: true,
  imports: [
    MatSelectModule,
    NgIf,
    MatFormField,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './remote-select.component.html',
  styleUrl: './remote-select.component.css',
})
export class RemoteSelectComponent extends BaseComponent implements OnInit {
  @Input() override params!: RemoteSelectParameters;
  @Input() override formControl!: FormControl;

  public remoteSelectService!: RemoteSelectService;

  public options: RemoteSelectOption[] = [];
  public remoteOptions: RemoteSelectOption[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.remoteSelectService = this.injector.get(RemoteSelectService);
    this.defaultOptionsListener();
    this.loadOptions();
  }

  private defaultOptionsListener() {
    addGetterSetter(
      this.params,
      'defaultOptions',
      (oldValue, newValue) => {
        this.mergeOptions();
      },
      true
    );
  }

  private async loadOptions() {
    const url = this.params.service.url();
    const method = this.params.service.method;
    const body = this.params.service.body
      ? this.params.service.body()
      : undefined;
    const response = await this.remoteSelectService.getPromise<
      RemoteSelectOption[]
    >({
      url,
      method,
      body,
    });

    this.remoteOptions = this.beautyResponse<RemoteSelectOption>(response);
    this.mergeOptions();
  }

  private beautyResponse<T = Object[]>(response: T[]): T[] {
    const keys: RemoteSelectParametersServiceKeys = {
      value: this.params.service.keys?.value ?? 'value',
      description: this.params.service.keys?.description ?? 'description',
    };

    return response.map((item) => {
      return {
        value: getDeepValue(item, keys.value),
        description: getDeepValue(item, keys.description) ?? '',
      };
    }) as T[];
  }

  private mergeOptions() {
    this.options = [
      ...(this.params.defaultOptions || []),
      ...(this.remoteOptions || []),
    ];
  }
}
