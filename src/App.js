import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

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
               <BurgerBuilder />
            </Layout>
          </div>
        </div>
      );
    }
}

export default App;
