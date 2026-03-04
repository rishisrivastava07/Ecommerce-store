import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../services/auth-api';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'login': props<{ username: string; password: string }>(),
    'login success': props<{ token: string, userId: number | null }>(),
    'login failure': props<{ error: string }>(),

    'register': props<RegisterRequest>(),
    'register success': emptyProps(),
    'register failure': props<{ error: string }>(),

    'logout': emptyProps(),
    'logout success': emptyProps(),
  },
});
