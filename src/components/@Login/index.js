import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit() {
    const { setToken } = this.props;
    const { username, password } = this.state;

    setToken(username + password);
  }

  renderTitle() {
    return (
      <React.Fragment>
        <Typography component="h2" variant="h4">
          Login
        </Typography>
      </React.Fragment>
    );
  }

  renderForm() {
    return (
      <React.Fragment>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={event => {
            this.setState({ username: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSubmit();
              event.preventDefault();
            }
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={event => {
            this.setState({ password: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSubmit();
              event.preventDefault();
            }
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.handleSubmit()}
        >
          Login
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const { getToken } = this.props;

    return getToken() ? (
      <Redirect to="/" />
    ) : (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          {this.renderTitle()}
          {this.renderForm()}
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired
};

export default Login;
