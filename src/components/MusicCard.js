import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.addToFavorite = this.addToFavorite.bind(this);

    this.state = {
      isLoadingBox: false,
    };
  }

  addToFavorite = () => {
    this.setState({ isLoadingBox: true }, () => {
      const { data } = this.props;
      addSong(data);
      this.setState({ isLoadingBox: false });
    });
  };

  render() {
    const { data } = this.props;
    const { isLoadingBox } = this.state;

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
        { isLoadingBox ? <p>Carregando...</p> : (
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${data.trackId}` }
              type="checkbox"
              name="favorite"
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
