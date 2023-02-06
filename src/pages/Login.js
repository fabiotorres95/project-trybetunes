import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
  };

  inputChange = ({ target }) => {
    const username = target.value;
    this.setState(() => ({ name: username }));
  };

  render() {
    const { name } = this.state;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            onChange={ this.inputChange }
            type="text"
            data-testid="login-name-input"
          />
          <button
            onClick={ () => createUser({ name }) }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
