import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.addToFavorite = this.addToFavorite.bind(this);

    this.state = {
      songList: [{}],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = () => {
    this.setState({ isLoading: true }, async () => {
      const { match } = this.props;
      const { id } = match.params;

      let songs = await getMusics(id);
      if (songs.length === 0) { songs = [{}]; }
      this.setState({ songList: songs, isLoading: false });
    });
  };

  addToFavorite = (number) => {
    const { songList } = this.state;
    const track = songList.filter((obj) => obj.trackNumber === number);
    addSong(track);
  };

  render() {
    const { isLoading, songList } = this.state;

    return (isLoading ? <Loading />
      : (
        <div data-testid="page-album">
          <Header />
          <h1>Album Info</h1>
          { songList.length <= 1
            ? <p>Álbum não encontrado.</p>
            : songList.map((obj) => {
              if (obj.kind === 'song') {
                return (
                  <div key={ obj.trackName }>
                    {console.log(obj)}
                    <p>{obj.trackName}</p>
                    <audio
                      data-testid="audio-component"
                      src={ obj.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <label htmlFor="favorite">
                      Favoritar
                      <input
                        type="checkbox"
                        label="Favoritar"
                        name="favorite"
                        onClick={ () => this.addToFavorite(obj.trackNumber) }
                      />
                    </label>
                  </div>
                );
              }
              return (
                <div key={ obj.artistName }>
                  <h2 data-testid="artist-name">{obj.artistName}</h2>
                  <h3 data-testid="album-name">{obj.collectionName}</h3>
                </div>
              );
            })}
        </div>)
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
