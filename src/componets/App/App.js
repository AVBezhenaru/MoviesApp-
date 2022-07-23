import React, { Component } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { debounce } from 'lodash';

import 'antd/dist/antd.min.css';
import './App.css';
import MovieService from '../../services/MovieService';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieList from '../MovieList/MovieList';
import { GenreProvider } from '../Context/Context';

export default class App extends Component {
  movieService = new MovieService();

  state = {
    searchMovies: [],
    ratedMovies: [],
    genres: [],
    loading: false,
    error: false,
    alertMessage: '',
    query: '',
    pageNumber: 1,
    totalResults: 0,
    totalRatedResults: 0,
    guestSession: null,
  };

  updateMovies = () => {
    this.setState({ loading: true, error: false });
    if (this.state.query === '') {
      this.setState({ searchMovies: [], loading: false, totalResults: 0 });
      return;
    }
    this.movieService
      .getMovies(this.state.query, this.state.pageNumber)
      .then(({ results, total_results }) => {
        if (total_results === 0) {
          this.setState({ alertMessage: 'Oops, Your request did not result', error: true });
        }
        this.setState({ searchMovies: results, loading: false, totalResults: total_results });
      })
      .catch(this.onError);
  };

  debounceUpdateMovies = debounce(this.updateMovies, 200);

  handleSearchKeyPress = (event) => {
    this.setState({ query: event.target.value });
  };

  onError = (error) => {
    this.setState({
      error: true,
      loading: false,
      totalResults: 0,
      alertMessage: error.message,
    });
  };

  onChangePage = (page) => {
    this.setState({ pageNumber: page });
  };

  sendRateMovie = (rate, id) => {
    this.movieService.sendRateMovie(id, rate, this.state.guestSession).then(this.getRateMovie);
    const newArr = this.state.searchMovies;
    newArr.map((item) => {
      if (item.id === id) {
        item.rating = rate;
      }
    });
    this.setState({ searchMovies: newArr });
  };

  getRateMovie = () => {
    this.movieService.getRatedMovies(this.state.guestSession).then((res) => {
      this.setState(() => {
        return { ratedMovies: res.results, totalRatedResults: res.total_results };
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.pageNumber !== this.state.pageNumber) {
      this.debounceUpdateMovies();
    }

    if (prevState.searchMovies !== this.state.searchMovies) {
      this.setState(this.state);
    }
  }

  componentDidMount() {
    this.movieService.authentication().then((res) => {
      this.setState({ guestSession: res.guest_session_id });
    });
    this.movieService.getGenres().then((res) => this.setState({ genres: res.genres }));
  }

  render() {
    const { searchMovies, ratedMovies, totalResults, totalRatedResults, genres, ...props } = this.state;

    return (
      <GenreProvider value={genres}>
        <div className="App">
          <Tabs defaultActiveKey="Search" centered={true}>
            <TabPane tab="Search" key="Search">
              <MovieSearch handleSearchKeyPress={this.handleSearchKeyPress} />
              <MovieList
                {...props}
                totalResults={totalResults}
                movies={searchMovies}
                sendRateMovie={this.sendRateMovie}
                onChangePage={this.onChangePage}
              />
            </TabPane>
            <TabPane tab="Rated" key="Rated">
              <MovieList
                movies={ratedMovies}
                totalResults={totalRatedResults}
                sendRateMovie={this.sendRateMovie}
                onChangePage={this.onChangePage}
                {...props}
              />
            </TabPane>
          </Tabs>
        </div>
      </GenreProvider>
    );
  }
}
