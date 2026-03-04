import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../core/components/header";
import { Footer } from "../core/components/footer";
import { Store } from '@ngrx/store';
import { cartActions } from './cart/store/cart-actions';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>
    <div class="flex-1 container mx-auto">
      <router-outlet/>
    </div>
    <app-footer></app-footer>
  `,
  host: {
    class: 'flex flex-col min-h-screen',
  },
})
export class MainLayout implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(cartActions.load());
  }
}
