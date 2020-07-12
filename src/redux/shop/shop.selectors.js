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
    (collections) => collections ? collections[collectionUrlParam] : null
  );

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // ' Object.keys' gets all of the key of an objct in an array format
  // then get the value of the collection at that key which will give us an array of items
  (collections) => collections ? Object.keys(collections).map((key) => collections[key]) : []
);
