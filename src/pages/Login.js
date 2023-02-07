import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.verify = this.verify.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      name: '',
      isNotValid: true,
      isLoading: false,
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

  buttonClick = () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name });
      // this.setState({ isLoading: false });
      history.push('/search');
    });
  };

  render() {
    // const { name } = this.state;
    const { isNotValid } = this.state;
    const { isLoading } = this.state;

    return isLoading
      ? <Loading /> : (
        <div data-testid="page-login">
          <h1>Login</h1>
          <form>
            <input
              onChange={ this.inputChange }
              type="text"
              data-testid="login-name-input"
            />
            <button
              onClick={ this.buttonClick }
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

Login.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.objectOf(PropTypes.string),
    push: PropTypes.func,
    replace: PropTypes.func,

  }).isRequired,
};

export default Login;
