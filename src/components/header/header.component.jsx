import React from "react";
import { connect } from "react-redux";
// utilised when we need to use multiple selectors
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase-util";
import CartIcon from "../cart-icon/cat-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

// special syntax in react for importing svg
import { ReactComponent as Logo } from "../../assets/4.3 crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contact">Contact</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// 'createStructuredSelector' will automatically pass the top level state into each selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// 'connect' is HOC allows us modify components to have access to things related to redux
// first args returns the state as props from redux store and passes it to the header component as props
export default connect(mapStateToProps)(Header);
