import { Login } from '../../pages/login/login';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  id: number;
  username: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly baseUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  login(request: LoginRequest) {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponse>(url, request);
  }

  register(request: RegisterRequest) {
    const url = `${this.baseUrl}/users`;
    return this.http.post<RegisterRequest>(url, request);
  }
}
