import { createSelector } from "reselect";

// used to get collections based on their id
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

// get the whole collections object
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// get collections from redux by the the 'collectionUrlParam'
// e.g. collection id of 1 will match with the hats url as it is an id of 1 in the collection id map
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );
