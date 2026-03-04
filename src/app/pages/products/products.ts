import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { productActions } from './store/product-actions';
import { productFeatures } from './store/product-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../core/components/product-card';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/models/product-type';
import { cartActions } from '../cart/store/cart-actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  imports: [ProductCard, FormsModule],
})
export class Products implements OnInit {
  private readonly store = inject(Store);
  protected readonly products = toSignal(this.store.select(productFeatures.selectFilteredProducts));
  protected readonly loading = toSignal(this.store.select(productFeatures.selectLoading));

  protected searchQuery = signal('');


  protected onSearch(query: string) : void {
    this.store.dispatch(productActions.search({ searchQuery : query }));
  }

  ngOnInit(): void {
    this.store.dispatch(productActions.load());
  }

  protected onAddToCart(product: Product): void {
    this.store.dispatch(cartActions.addToCart({ product }));
  }
}
