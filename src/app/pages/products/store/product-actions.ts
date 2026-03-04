import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../../../shared/models/product-type";

export const productActions = createActionGroup({
  source: "Products",
  events: {
    load: emptyProps(),
    loadSuccess: props<{ products: Product[] }>(),
    loadFailure: props<{ error: any }>(),

    search: props<{ searchQuery: string }>(),
  },
})
