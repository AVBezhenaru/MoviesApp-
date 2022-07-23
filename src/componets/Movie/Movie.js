import React, { Component } from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';

import { GenreConsumer } from '../Context/Context';

import icon from './film-img.svg';

import './Movie.css';

export default class Movie extends Component {
  textReduction = (text) => {
    let result = text.split('');

    for (let i = 0; i < result.length; i++) {
      if (i >= 200 && result[i] === ' ') {
        return `${result.splice(0, i).join('')}...`;
      }
    }
  };

  setBorderColor = (voteAverage) => {
    let bordColor = '';

    if (voteAverage < 3) {
      bordColor += '#E90000';
    } else if (voteAverage < 5) {
      bordColor += '#E97E00';
    } else if (voteAverage < 7) {
      bordColor += '#E9D100';
    } else {
      bordColor += '#66E900';
    }
    return bordColor;
  };

  render() {
    const { img, title, date, genreId, overview, voteAverage, sendRateMovie, movieId, rating } = this.props;

    return (
      <GenreConsumer>
        {(genres) => (
          <div className="movie">
            <div className="movie__img">
              <img src={!img ? icon : `https://image.tmdb.org/t/p/w500${img}`} alt="poster" />
            </div>
            <div className="movie__header">
              <div className="movie__top">
                <div className="movie__title">{title}</div>
                <div className="movie__average" style={{ borderColor: this.setBorderColor(voteAverage) }}>
                  {voteAverage.toFixed(1)}
                </div>
              </div>

              <div className="movie__date">{!date ? 'no release data' : format(new Date(date), 'MMMM d, yyyy')}</div>
              <ul className="movie__genre">
                {genreId.map((id) => (
                  <li key={id} className={'movie__genre_item'}>
                    {genres.find((genre) => genre.id === id).name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="movie__info">
              <div className="movie__overview">
                {!this.redactOverviewText ? 'No description' : this.textReduction(overview)}
              </div>
              <div className="movie__rating">
                <Rate
                  allowHalf={true}
                  defaultValue={!rating ? 0 : rating}
                  value={!rating ? 0 : rating}
                  count={10}
                  style={{ fontSize: 16 }}
                  onChange={(value) => {
                    sendRateMovie(value, movieId);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </GenreConsumer>
    );
  }
}
