import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { Product } from "../../../shared/models/product-type";
import { API_URL } from "../../../app.config";

@Injectable({
  providedIn: "root",
})
export class ProductApi {
  private readonly baseUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  public getProducts(){
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }
}
