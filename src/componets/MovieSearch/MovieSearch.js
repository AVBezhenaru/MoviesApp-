import React, { Component } from 'react';

import MovieService from '../../services/MovieService';

export default class MovieSearch extends Component {
  movieService = new MovieService();

  render() {
    return (
      <form action="">
        <input type="Type to search" />
      </form>
    );
  }
}
