import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Loading';
import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songList: [{}],
      isLoading: false,
      // favoriteList: [],
    };
  }

  componentDidMount() {
    this.getSongs();
    // this.showFavorites();
  }

  // showFavorites = () => {
  //   this.setState({ isLoading: true }, async () => {
  //     const list = await getFavoriteSongs();
  //     console.log(list);
  //     this.setState({ favoriteList: list, isLoading: false });
  //   });
  // };

  getSongs = () => {
    this.setState({ isLoading: true }, async () => {
      const { match } = this.props;
      const { id } = match.params;

      let songs = await getMusics(id);
      if (songs.length === 0) { songs = [{}]; }
      this.setState({ songList: songs, isLoading: false });
    });
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
                return <MusicCard data={ obj } key={ obj.trackName } />;
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
