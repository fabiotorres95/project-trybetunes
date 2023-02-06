import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.verify = this.verify.bind(this);

    this.state = {
      name: '',
      isNotValid: true,
    };
  }

  verify = () => {
    const { name } = this.state;
    const charLimit = 3;
    let result = true;
    if (name.length >= charLimit) {
      result = false;
    }

    this.setState({ isNotValid: result });
  };

  inputChange = ({ target }) => {
    const username = target.value;
    this.setState(() => ({ name: username }), this.verify);
  };

  render() {
    const { name } = this.state;
    const { isNotValid } = this.state;

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
            disabled={ isNotValid }
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
