import { productFilters } from "../filters/constants";
import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/selectors";

export const selectAllProducts = (state) => state.products.items;

export const selectProductById = (productId) => (state) =>
  state.products.items.find((item) => item.id === productId);

export const selectFilteredProducts = createSelector(
  [selectFilter, selectAllProducts],
  (filter, products) => {
    if (filter === productFilters.ALL) {
      return products;
    }
    return products.filter((product) => product.category === filter);
  }
);

export const selectProductsByCategory = (category) =>
  createSelector([selectAllProducts], (products) =>
    products.filter((product) => product.category === category)
  );

export const selectFavoriteProductsIds = (state) => state.products.wishlist;

export const selectFavoriteProducts = createSelector(
  [selectFavoriteProductsIds, selectAllProducts],
  (ids, allProducts) =>
    allProducts.filter((product) => ids.includes(product.id))
);
