import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';

class Header extends React.Component {
  state = {
    isLoading: false,
    user: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    let user = '';
    this.setState({ isLoading: true }, async () => {
      await getUser().then((result) => {
        user = result.name;
      });
      this.setState({ isLoading: false, user });
    });
  };

  render() {
    const { isLoading } = this.state;
    const { user } = this.state;

    return isLoading ? <Loading /> : (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ user }</p>
        <Link to="/search" data-testid="link-to-search">Buscar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
