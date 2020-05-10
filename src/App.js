import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // state={
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }
    render (){
      return (
        <div className="App">
          <div>
            <Layout>
              <Switch>
                <Route path='/checkout' component={Checkout} />
                <Route path='/orders' component={Orders}/>
                <Route path='/' exact component={BurgerBuilder} />
              </Switch>
            </Layout>
          </div>
        </div>
      );
    }
}

export default App;
