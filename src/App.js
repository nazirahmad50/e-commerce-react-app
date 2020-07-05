import React, { Component, useReducer } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/Shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase-util";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if a user is signed in
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // listen for changes on userRef also get back the first state of that data
        userRef.onSnapshot((snapshot) => {
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(), 
              },
            },
            // setState is async so have to pass a func as second param, because there is a chance set state is not finished so any call after it might wont work
            () => {
              // console.log(this.state.currentUser);
            }
          );
        });
      }
      // if user signs out
      else {
        // current user is null
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    // close the subscription as we dont want any memory leaks
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        {/*placing the header outside the switch and routers will allow it to display in every page*/}
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
