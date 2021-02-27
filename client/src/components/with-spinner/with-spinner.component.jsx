import React from 'react'
import {connect} from 'react-redux'
import {SpinnerOverlay, SpinnerContainer} from './with-spinner.styles.jsx'
import {createStructuredSelector} from 'reselect'
import {selectPending} from '../../redux/shop/shop.selectors'

const WithSpinner = WrappedComponent=>({isLoading, ...otherProps})=>{
   //console.log(isLoading);

    return isLoading?(
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ): (<WrappedComponent {...otherProps} ></WrappedComponent>)
}

// const mapStateToProps = createStructuredSelector({
//     isLoading: selectPending
//   })

export default WithSpinner;