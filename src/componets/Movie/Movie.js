import React from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';

import icon from './film-img.svg';

import './Movie.css';

const Movie = ({ img, title, date, genre, overview, rating }) => {
  const textReduction = (text) => {
    let result = text.split('');

    for (let i = 0; i < result.length; i++) {
      if (i >= 200 && result[i] === ' ') {
        return `${result.splice(0, i).join('')}...`;
      }
    }
  };
  const redactOverviewText = textReduction(overview);
  console.log(1);

  return (
    <div className="movie">
      <div className="movie__img">
        <img src={!img ? icon : `https://image.tmdb.org/t/p/w500${img}`} alt="poster" />
      </div>
      <div className="movie__header">
        <div className="movie__top">
          <div className="movie__title">{title}</div>
          <div className="movie__average">{rating}</div>
        </div>

        <div className="movie__date">{!date ? 'no release data' : format(new Date(date), 'MMMM d, yyyy')}</div>
        <div className="movie__genre">{genre}</div>
      </div>
      <div className="movie__info">
        <div className="movie__overview">{!redactOverviewText ? 'No description' : redactOverviewText}</div>
        <div className="movie__rating">
          <Rate allowHalf defaultValue={rating} count={10} style={{ fontSize: 15 }} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
