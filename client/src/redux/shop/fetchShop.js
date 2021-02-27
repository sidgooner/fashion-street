import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from './shop.actions';

function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        fetch('http://localhost:1337/api/shop')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            else{
               // console.log(res);   
            }
            dispatch(fetchProductsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;
