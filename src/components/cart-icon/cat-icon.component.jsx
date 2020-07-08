import React from "react";
import { connect } from "react-redux";

import { toogleCartHidden } from "../../redux/cart/cart.action";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/11.1 shopping-bag.svg";

import "../cart-icon/cart-icon.styles.scss";

const CartIcon = ({ toogleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toogleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

// pass whole reducer state into the selector
const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  toogleCartHidden: () => dispatch(toogleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
