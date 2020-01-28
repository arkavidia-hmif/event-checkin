import React from 'react';
import { Redirect } from 'react-router';
import QrReader from 'react-qr-reader';
import Link from '@material-ui/core/Link';

import { ROUTE_LOGIN } from '../../utils/constans';

class Main extends React.Component {
  state = {
    result: 'No result'
  };

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
  handleError = () => {
    this.setState({
      result: 'Try Again.'
    });
  };
  render() {
    const { getToken, setToken } = this.props;
    return getToken() ? (
      <div className="App">
        <div className="App-header">
          <Link
            href="#"
            onClick={() => {
              setToken('');
            }}
            variant="body2"
          >
            Logout
          </Link>
          <div>
            <QrReader
              delay={300}
              showViewFinder={false}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%', maxWidth: '500px' }}
            />
            <p style={{ color: 'black' }}>{this.state.result}</p>
            <button className="button" onClick={() => alert('Sent!')} >Send</button>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to={ROUTE_LOGIN} />
    );
  }
}

export default Main;
