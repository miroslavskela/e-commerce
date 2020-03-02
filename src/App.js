import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Checkout from './pages/checkout/checkout.component';
import SignInSignUpComponent from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, addCollectionAndDocuments} from './firebase/firebase.util';
import {createUserProfileDocument} from './firebase/firebase.util';
import {setCurrentUser}from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import {selectCollectionsForPreview} from './redux/shop/shop.selectors'

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser, collectionsArray} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser:user})
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
         setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()           
          })        
        })
        return
      }

      setCurrentUser(userAuth)
      //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}) ))
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  
  render() {
    return (
      <div className='App'>
       <Header/>
       <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route  path="/shop" component={ShopPage}/>
        <Route  exact path="/checkout" component={Checkout}/>
        <Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to="/"/> : <SignInSignUpComponent/>} />

         </Switch> 
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
setCurrentUser:user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps,mapDispatchToProps )(App);
