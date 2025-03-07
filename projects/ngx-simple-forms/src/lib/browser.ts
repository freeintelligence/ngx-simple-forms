import { TooltipComponent } from '@angular/material/tooltip';

export function callbackObserveMatTooltips(mutationsList: MutationRecord[]) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const elmTooltip = mutation.target as HTMLElement;
      const elmSurface = elmTooltip.querySelector(
        '.mdc-tooltip__surface'
      ) as HTMLElement;
      const originalValue = (elmTooltip as any).originalValue;
      const withHtml = elmTooltip?.classList?.contains(
        'ngx-simple-forms__tooltip-with-html'
      );

      if (!elmSurface || !elmTooltip) {
        return;
      }

      (elmTooltip as any).withHtml = withHtml;

      if (withHtml) {
        elmSurface.innerHTML = originalValue;
      } else {
        elmSurface.innerText = originalValue;
      }
    }
  }
}

export function createObserverMatTooltips() {
  const observer = new MutationObserver(callbackObserveMatTooltips);

  return observer;
}

export function interceptMatTooltipsMessage() {
  const observer = createObserverMatTooltips();

  Object.defineProperty(TooltipComponent.prototype, 'message', {
    set(v: any) {
      const elmSurface = document.querySelector(
        '.mdc-tooltip__surface'
      ) as HTMLElement;
      const elmTooltip = elmSurface?.parentElement as HTMLElement;
      const withHtml = (elmTooltip as any).withHtml;

      if (!elmSurface || !elmTooltip) {
        return;
      }

      if ((elmTooltip as any).isObserved) {
        if (withHtml) {
          elmSurface.innerHTML = v;
        } else {
          elmSurface.innerText = v;
        }
      } else {
        observer.observe(elmTooltip, {
          attributeFilter: ['class'],
          attributeOldValue: true,
        });
      }

      (elmTooltip as any).originalValue = v;
      (elmTooltip as any).isObserved = true;
    },
  });
}
