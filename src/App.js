import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';

import NotFound from './components/NotFound';
import Classes from './components/Classes';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Classes</title>
      </Helmet>
      <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <Route exact path="/" component={Classes}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
      </SnackbarProvider>
    </HelmetProvider>
  );
}

export default App;
