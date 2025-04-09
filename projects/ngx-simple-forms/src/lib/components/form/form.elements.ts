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

export type BaseFormElement<Params, GetOnExtra = any> = {
  disabled?: () => boolean | undefined;
  hidden?: (extra?: GetOnExtra) => boolean;
  value?: unknown;
  formControl?: FormControl;
  componentRef?: ComponentRef<BaseComponent>;
  validators?: BaseFormElementValidator[];
  params?: Params;
  tooltip?: BaseFormElementTooltip;
  styles?: Partial<CSSStyleDeclaration>;
  onMouseOver?: (event: Event, extra?: GetOnExtra) => void;
  onMouseOut?: (event: Event) => void;
  onClick?: (event: Event) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onFocus?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  getOnExtra?: () => GetOnExtra;
};

export type FormElement<Params = unknown, GetOnExtra = any> =
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
