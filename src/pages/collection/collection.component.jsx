import React from "react";
import {connect} from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import {selectCollection} from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => (
  <div className="collection-page">
    <h2>{collection.title}</h2>
  </div>
);

// ownProps are the props of the component that is sorrounded by connect
// pass state after invoking 'selectCollection' func
const mapStateToProps = (state, ownProps) =>({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
