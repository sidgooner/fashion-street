import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {Route} from 'react-router-dom'
import CollectionPage from '../collection/collection.component';
import {createStructuredSelector} from 'reselect'
import { connect } from 'react-redux';
import fetchProducts from '../../redux/shop/fetchShop'
import {selectCollections} from '../../redux/shop/shop.selectors'
import {selectError} from '../../redux/shop/shop.selectors'
import {selectPending} from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage); 

class ShopPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.shouldComponentRender = this.shouldComponentRender.bind(this);
// }


  
  componentDidMount() {
    //const {fetchProducts} = this.props.fetchProducts;
    this.props.fetchProducts();
    // if(!this.props.pending)
    // {this.setState({isLoading:false})}
}
  render(){
  const match1 = this.props;
  //const loading=this.state;
  //console.log(match1);
  //console.log(SHOP_DATA);
  //console.log(match1.match.path);
  //console.log(match1.collections);
  return(
        
    <div className='shop-page'>
      <Route exact path={`${match1.match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={match1.pending} {...props}/>} />
      <Route path={`${match1.match.path}/:collectionId`} render={(props)=><CollectionsPageWithSpinner isLoading={match1.pending} {...props}/>}/>
    </div>

);
}
}

const mapStateToProps = createStructuredSelector({
  error: selectError,
  collections: selectCollections,
  pending: selectPending
})

const mapDispatchToProps = dispatch =>({
  fetchProducts:()=> dispatch(fetchProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);

