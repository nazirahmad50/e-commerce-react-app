import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { updateCollections } from "../../redux/shop/shop.actions";

import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase-util";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    // get a ref to firestore collection
    const collectionRef = firestore.collection("collections");

    // whenever the collectionRef updates or whenever this code runs for the first time,
    // then this collectionRef will send us the snapshot representing the code of our collections array
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        // convert collections from being in an array to its own seperate objects
        const collectionMap = convertCollectionSnapshotToMap(snapshot);

        // update the collections in redux store
        updateCollections(collectionMap);

        // set the loading ot false as now we have recieved the data from firestore
        this.setState({ loading: false });
      }
    );
  }

  render() {
    // got the match prop as this comp is a route in app.js
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        {/*nested routes*/}
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
