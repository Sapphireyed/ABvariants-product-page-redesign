import { applyVariant } from "./variation/variation";
import { revertToDefault } from "./default/default";

export function initContent() {
  window.AsdaGeorgeABTest = (function() {
    let currentState = 'default';

    function toggleVariant(variant) {
      if (!variant) {
        console.error('Please provide a variant name when calling the toggle function');
        return;
      }

      variant = variant.toLowerCase();

      if (variant === currentState) {
        console.log(`Already in ${variant} state`);
        return;
      }

      if (variant === 'default') {
        revertToDefault('test-1-styles');
        currentState = 'default';
      } else if (variant === 'variant') {
        applyVariant();
        currentState = 'variant';
      } else {
        console.error('Invalid variant. Please choose "Variant" for variant and "Default" for default');
        return;
      }
    }

    return {
      toggle: toggleVariant
    };
  })();
}
