import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
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

export default App;
