import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'
import  asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch , withRouter,Redirect} from 'react-router';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/action/indexAction';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  // state={
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
    render (){

      let routes = (
        <Switch>
          <Route path='/auth' component={asyncAuth}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
          </Switch>
      )

      if(this.props.isAuthenticated){
        routes = (
          <Switch>
            <Route path='/checkout' component={asyncCheckout} />
            <Route path='/orders' component={asyncOrders}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        );
      }

      return (
        <div className="App">
          <div>
            <Layout>
              {routes}
            </Layout>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
