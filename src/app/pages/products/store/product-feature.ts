import { productActions } from './product-actions';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from "../../../shared/models/product-type";

export type ProductState = {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string | null;
  error: string | null;
  loading: boolean;
};

export const initialProductState: ProductState = {
  products: [],
  filteredProducts: [],
  searchQuery: null,
  error: null,
  loading: false,
};

export const productFeatures = createFeature({
  name: 'products',
  reducer: createReducer(
    initialProductState,

    on(productActions.load, (state) => ({
      ...state,
      loading: true,
    })),
    on(productActions.loadSuccess, (state, { products }) => ({
      ...state,
      products,
      filteredProducts: products,
      loading: false,
    })),
    on(productActions.loadFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),

    on(productActions.search, (state, { searchQuery }) => ({
      ...state,
      searchQuery: searchQuery,
      filteredProducts: state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    })),
  ),
});
