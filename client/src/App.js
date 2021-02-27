import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component' 
import {connect} from 'react-redux';
import ShopPage from './pages/shop/shop.component'
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {setCurrentUser} from './redux/user/user-actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component{

  signOut = ()=>{
    this.props.setCurrentUser(null);
    localStorage.clear();
  }
  render(){
    return(
      <div >
      <Header signOut={this.signOut}/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>
        <Route exact path='/checkout' render={()=>this.props.currentUser ? (<CheckoutPage/>): (<SignInAndSignUpPage/>)} />
        
      </Switch>
    </div>
    );
  }
}

 const mapDispatchToProps= (dispatch)=>({
   setCurrentUser: user=> dispatch(setCurrentUser(user))
 });

 const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
