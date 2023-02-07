import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.verify = this.verify.bind(this);

    this.state = {
      artist: '',
      isDisabled: true,
    };
  }

  verify = () => {
    const { artist } = this.state;
    const charLimit = 2;
    let result = true;
    if (artist.length >= charLimit) {
      result = false;
    }

    this.setState({ isDisabled: result });
  };

  inputChange = ({ target }) => {
    const artist = target.value;
    this.setState({ artist }, this.verify);
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Buscar</h1>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.inputChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
