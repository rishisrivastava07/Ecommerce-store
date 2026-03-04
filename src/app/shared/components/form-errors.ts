import { FieldState, required } from '@angular/forms/signals';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  template: `
    @if(shouldShowErrors()) {
      @for(error of control().errors(); track error.kind) {
        <small class="text-red-500 text-sm mt-1">{{ error.message }}</small>
      }
    }
  `,
})
export class FormErrors {
  readonly control = input.required<FieldState<unknown>>();

  protected readonly shouldShowErrors = computed(() => {
    const field = this.control();
    return field.touched() && field.invalid();
  });
}
