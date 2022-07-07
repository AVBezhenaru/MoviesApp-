import React from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';

import './Movie.css';

const Movie = ({ img, title, date, genre, overview, rating }) => {
  return (
    <div className="movie">
      <div className="movie__img">
        <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="" />
      </div>
      <div className="movie__header">
        <div className="movie__top">
          <div className="movie__title">{title}</div>
          <div className="movie__average">{rating}</div>
        </div>

        <div className="movie__date">{format(new Date(date), 'MMMM d, yyyy')}</div>
        <div className="movie__genre">{genre}</div>
      </div>
      <div className="movie__info">
        <div className="movie__overview">{overview}</div>
        <div className="movie__rating">
          <Rate allowHalf defaultValue={rating} count={10} style={{ fontSize: 15 }} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
