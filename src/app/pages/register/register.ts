import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { form, required, FormField, validate } from '@angular/forms/signals';
import { FormErrors } from '../../shared/components/form-errors';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { authActions } from '../../shared/store/auth-action';
@Component({
  selector: 'app-register',
  imports: [Button, FormField, FormErrors, FormsModule],
  templateUrl: './register.html',
})
export class Register {
  registerModel = signal({
    id: 0,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (rootPath) => {
    required(rootPath.username, { message: 'Username is required' });
    required(rootPath.email, { message: 'Email is required' });
    required(rootPath.password, { message: 'Password is required' });
    required(rootPath.confirmPassword, { message: 'Confirm Password is required' });

    validate(rootPath.confirmPassword, ({value , valueOf}) => {
      const password = valueOf(rootPath.password);
      const confirmPassword = value();

      if (confirmPassword !== password) {
        return { kind: 'passwordMismatch', message: 'Passwords do not match' };
      }
      return null;
    });
  });

  private readonly store = inject(Store);
  protected readonly isLoading$ = toSignal(this.store.select(state => state.auth.isLoading));

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().valid()) {
      const {confirmPassword, ...rest} = this.registerForm().value();
      const registerRequest = {...rest, id: Date.now()};
      this.store.dispatch(authActions.register(registerRequest));
    }
  }
}


