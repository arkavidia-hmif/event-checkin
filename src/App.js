import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import './App.css';
import { LOCAL_STORAGE_TOKEN } from './utils/constans';
import routes from './utils/routes';

import './App.css';

class App extends React.Component {
  state = {
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN)
  };

  getToken() {
    const { token } = this.state;
    return token ? token : '';
  }

  setToken(token) {
    this.setState({ token: token });
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  }

  render() {
    return (
      <Container component="main" maxWidth="md" style={{ paddingTop: '70px' }}>
        <Router>
          <div className="App">
            <Switch>
              {routes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  render={props => (
                    <route.component
                      {...props}
                      key={i}
                      setToken={token => {
                        this.setToken(token);
                      }}
                      getToken={() => this.getToken()}
                    />
                  )}
                />
              ))}
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
