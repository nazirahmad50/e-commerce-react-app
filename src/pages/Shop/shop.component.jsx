import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { updateCollections } from "../../redux/shop/shop.actions";

import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase-util";

class ShopPage extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {

    const {updateCollections} = this.props;

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
      }
    );
  }

  render() {
    // got the match prop as this comp is a route in app.js
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        {/*nested routes*/}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
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
