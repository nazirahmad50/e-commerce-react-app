export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // if the item that is being added to the cart already exists in the cartItems array
  if (existingItem) {
    // map over each cart item and check if the item that is being added to the cart has its id equlal to one of the items in the array then increase its quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // add a base quantity of 1 for the cart item to add if the existingItem returns false
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
