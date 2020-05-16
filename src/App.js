import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch , withRouter,Redirect} from 'react-router';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/action/indexAction';

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
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
          </Switch>
      )

      if(this.props.isAuthenticated){
        routes = (
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders}/>
            <Route path='/logout' component={Logout}/>
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
