import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.addToFavorite = this.addToFavorite.bind(this);

    this.state = {
      isLoadingBox: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.isFavorite();
  }

  isFavorite = () => {
    const { data } = this.props;
    this.setState({ isLoadingBox: true }, async () => {
      const list = await getFavoriteSongs();
      const result = list.filter((obj) => obj.trackId === data.trackId);
      console.log(result);
      if (result.length !== 0) {
        this.setState({ checked: true });
      }
      this.setState({ isLoadingBox: false });
    });
  };

  addToFavorite = () => {
    this.setState({ isLoadingBox: true }, async () => {
      const { data } = this.props;
      await addSong(data);
      this.setState({ isLoadingBox: false, checked: true });
    });
  };

  render() {
    const { data } = this.props;
    const { isLoadingBox, checked } = this.state;

    return (
      <>
        <p>{data.trackName}</p>
        <audio
          data-testid="audio-component"
          src={ data.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { isLoadingBox ? <Loading /> : (
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${data.trackId}` }
              type="checkbox"
              name="favorite"
              checked={ checked }
              onChange={ this.addToFavorite }
            />
          </label>
        )}
      </>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackNumber: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
