import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import CollectionPreview from "../../components/collection-preview/collection-preview";

import {selectCollections} from "../../redux/shop/shop.selectors";


import "./collections-overview.styles.scss"

// handles all the collection items in the shop page
const CollectionOverview = ({collections}) =>(
    <div className="collections-overview">
          {
            collections.map(({id, ...otherCollections}) =>(
                <CollectionPreview key={id} {...otherCollections}/>
              ))
          }
          
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections:selectCollections
  })
  
  export default connect(mapStateToProps)(CollectionOverview);