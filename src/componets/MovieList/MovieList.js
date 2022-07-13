import React, { Component } from 'react';
import { List, Alert } from 'antd';
import { debounce } from 'lodash';

import './MovieList.css';
import Movie from '../Movie/Movie';
import MovieService from '../../services/MovieService';

export default class MovieList extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
    loading: false,
    error: false,
    alertMessage: '',
    query: '',
    pageNumber: 1,
    totalResults: 0,
  };

  updateMovies = () => {
    this.setState({ loading: true, error: false });
    if (this.state.query === '') {
      this.setState({ movies: [], loading: false, totalResults: 0 });
      return;
    }
    this.movieService
      .getMovies(this.state.query, this.state.pageNumber)
      .then(({ results, total_results }) => {
        if (total_results === 0) {
          this.setState({ alertMessage: 'Oops, Your request did not result', error: true });
        }
        this.setState({ movies: results, loading: false, totalResults: total_results });
      })
      .catch(this.onError);
  };

  debounceUpdateMovies = debounce(this.updateMovies, 200);

  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
      totalResults: 0,
      alertMessage: error.message,
    });
  };

  handleKeyPress = (event) => {
    this.setState({ query: event.target.value });
  };

  onChangePage = (page) => {
    this.setState({ pageNumber: page });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.pageNumber !== this.state.pageNumber) {
      this.debounceUpdateMovies();
    }
  }

  render() {
    const { movies, loading, query, totalResults, error, alertMessage } = this.state;

    const errorComponent = error ? <Alert message={alertMessage} type="warning" closable /> : null;
    return (
      <div>
        <input
          type="search"
          placeholder="Type to search..."
          value={query}
          onChange={this.handleKeyPress}
          className="moviesSearch"
        />
        {errorComponent}
        <List
          grid={{
            gutter: [32, 14],
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          loading={loading ? true : loading}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 20,
            total: totalResults,
            showSizeChanger: false,
            onChange: (page) => {
              this.onChangePage(page);
            },
          }}
          dataSource={movies}
          renderItem={(item) => (
            <List.Item>
              <Movie
                loading={loading}
                img={item.poster_path}
                title={item.title}
                date={item.release_date}
                genre={item.genre_ids}
                overview={item.overview}
                rating={item.vote_average}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
