import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

import NotFound from './components/NotFound';
import HomePage from './components/HomePage';
import Classes from './components/classes/Classes';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/classes" component={Classes}/>
            <Route exact path="/" component={HomePage}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
