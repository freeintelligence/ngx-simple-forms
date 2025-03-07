import { FormControl, ValidatorFn } from '@angular/forms';
import { BaseComponent } from '../elements/base/base.component';
import { InputComponent } from '../elements/input/input.component';
import { InputParameters } from '../elements/input/input.parameters';
import { SelectComponent } from '../elements/select/select.component';
import { SelectParameters } from '../elements/select/select.parameters';
import { ButtonComponent } from '../elements/button/button.component';
import { ButtonParameters } from '../elements/button/button.parameters';
import { ComponentRef } from '@angular/core';
import { DatepickerParameters } from '../elements/datepicker/datepicker.parameters';
import { DatepickerComponent } from '../elements/datepicker/datepicker.component';
import { RemoteSelectParameters } from '../elements/remote-select/remote-select.parameters';
import { RemoteSelectComponent } from '../elements/remote-select/remote-select.component';

type TooltipPosition =
  | 'left'
  | 'right'
  | 'above'
  | 'below'
  | 'before'
  | 'after';

export type BaseFormElementValidator = [ValidatorFn, string];

export type BaseFormElementTooltip = {
  disabled?: boolean;
  hideDelay?: number;
  message?: string;
  withHtml?: boolean;
  position?: TooltipPosition;
  positionAtOrigin?: boolean;
  showDelay?: number;
  class?: any;
  touchGestures?: 'auto' | 'off' | 'on';
};

export type DefaultGetOnExtra = {
  [key: string]: unknown;
};

export type BaseFormElement<Params, GetOnExtra = DefaultGetOnExtra> = {
  disabled?: () => boolean | undefined;
  hidden?: () => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
  validators?: BaseFormElementValidator[];
  params?: Params;
  tooltip?: BaseFormElementTooltip;
  styles?: Partial<CSSStyleDeclaration>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  getOnExtra?: () => GetOnExtra;
};

export type FormElement<Params = unknown, GetOnExtra = DefaultGetOnExtra> =
  | (BaseFormElement<Params, GetOnExtra> & {
      type: 'input';
      params: InputParameters;
    })
  | (BaseFormElement<Params, GetOnExtra> & {
      type: 'select';
      params: SelectParameters;
    })
  | (BaseFormElement<Params, GetOnExtra> & {
      type: 'button';
      params: ButtonParameters;
    })
  | (BaseFormElement<Params, GetOnExtra> & {
      type: 'datepicker';
      params: DatepickerParameters;
    })
  | (BaseFormElement<Params, GetOnExtra> & {
      type: 'remote-select';
      params: RemoteSelectParameters;
    });

export function getFormElementComponentByType(
  type: string
): typeof BaseComponent {
  const typesComponent: { [key: string]: typeof BaseComponent } = {
    input: InputComponent,
    select: SelectComponent,
    button: ButtonComponent,
    datepicker: DatepickerComponent,
    'remote-select': RemoteSelectComponent,
  };

  return typesComponent[type];
}
