import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../../../shared/models/product-type";
import { CartItem } from "../../../shared/models/cart-type";

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ items: CartItem[] }>(),
    loadFailure: props<{ error: string }>(),

    addToCart: props<{ product: Product }>(),
    addToCartSuccess: props<{ product: Product }>(),
    addToCartFailure: props<{ error: string }>(),

    removeFromCart: props<{ productId: number }>(),

    updateQuantity: props<{ productId: number; quantity: number }>(),

    clearCart: emptyProps(),
  },
});
