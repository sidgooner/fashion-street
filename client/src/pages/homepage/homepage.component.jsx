import React from 'react';
import Directory from '../../components/directory/directory.component';
import './homepage.styles.scss';
import { connect } from 'react-redux';
import fetchProducts from '../../redux/shop/fetchShop'
import {selectCollections} from '../../redux/shop/shop.selectors'
import {selectError} from '../../redux/shop/shop.selectors'
import {selectPending} from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import {createStructuredSelector} from 'reselect'

//const DirectoryWithSpinner = WithSpinner(Directory);
//const CollectionsPageWithSpinner = WithSpinner(CollectionPage); 

class HomePage extends React.Component {

    componentDidMount(){
        this.props.fetchProducts();
    }
    render(){
    return(<div className="homepage">
        <Directory/>
    </div>)
    
}
};

const mapStateToProps = createStructuredSelector({
    error: selectError,
    collections: selectCollections,
    pending: selectPending
  })
  
  const mapDispatchToProps = dispatch =>({
    fetchProducts:()=> dispatch(fetchProducts())
  })

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);