import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HomePage } from '../HomePage';

const NotFound = ({ location }) => (
    <div>
      <h1>404 - Not Found for <code>{location.pathname}</code>!</h1>
      <Link to="/">
        Go Home
      </Link>
    </div>
  );

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route component={NotFound} status={404}/>
                </Switch>
            </Router>
        );
    }
}

export { App }; 