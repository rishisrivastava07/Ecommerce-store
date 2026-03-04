import { form, Field, FormField, required, minLength } from '@angular/forms/signals';
import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { FormsModule } from '@angular/forms';
import { FormErrors } from "../../shared/components/form-errors";
import { Store } from '@ngrx/store';
import { authActions } from '../../shared/store/auth-action';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [Button, FormField, FormsModule, FormErrors],
  templateUrl: './login.html',
})
export class Login {
  loginModel = signal({
    username: 'johnd',
    password: 'm38rmF$',
  });

  loginForm = form(this.loginModel, (rootPath) => {
    required(rootPath.username, { message: 'Username is required' });
    required(rootPath.password, { message: 'Password is required' });
    minLength(rootPath.password, 6, { message: 'Password must be at least 6 characters' });
  });

  private readonly store = inject(Store);
  protected readonly isLoading$ = toSignal(this.store.select(state => state.auth.isLoading));

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      console.log('Form is valid:', this.loginForm().value());
      this.store.dispatch(authActions.login(this.loginForm().value()));
    } else {
      console.log('Form is invalid');
    }
  }
}
