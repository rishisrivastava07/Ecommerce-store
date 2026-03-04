import { HttpClient } from '@angular/common/http';
import { API_URL } from "../../../app.config";
import { inject, Injectable } from "@angular/core";
import { UserProfile } from '../../../shared/models/user-type';

@Injectable({
  providedIn: "root",
})
export class ProfileApi {
  private readonly baseApiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  public getUserProfile(userId: number) {
    return this.http.get<UserProfile>(`${this.baseApiUrl}/users/${userId}`);
  }
}
