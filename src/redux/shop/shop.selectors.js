import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

// get the whole collections object
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// get collections object from redux based on the 'collectionUrlParam'
// e.g. 
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
