import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.verify = this.verify.bind(this);
    this.searchAlbum = this.searchAlbum.bind(this);

    this.state = {
      artist: '',
      setArtist: '',
      isDisabled: true,
      isLoading: false,
      apiData: [],
      didSearch: false,
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

  searchAlbum = () => {
    this.setState({ isLoading: true }, async () => {
      const { artist } = this.state;
      const apiResult = await searchAlbumsAPI(artist);
      this.setState({
        apiData: apiResult,
        isLoading: false,
        setArtist: artist,
        didSearch: true });
    });
  };

  render() {
    const { isDisabled, isLoading, setArtist, apiData, didSearch } = this.state;

    return (isLoading ? <Loading /> : (
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
            onClick={ this.searchAlbum }
          >
            Pesquisar
          </button>
        </form>
        { didSearch
          ? (
            <>
              <p>
                Resultado de álbuns de:
                {' '}
                { setArtist }
              </p>
              {apiData.length !== 0
                ? (apiData.map((album) => (
                  <div key={ album.collectionId }>
                    <h2>{ album.collectionName }</h2>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Mais Detalhes
                    </Link>
                    <p>{ album.collectionPrice }</p>
                  </div>
                )))
                : <p>Nenhum álbum foi encontrado</p>}
            </>
          )
          : <div />}
      </div>
    ));
  }
}

export default Search;
