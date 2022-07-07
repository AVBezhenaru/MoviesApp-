import React, { Component } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

import MovieList from '../MovieList/MovieList';
import 'antd/dist/antd.min.css';
import './App.css';
import MovieService from '../../services/MovieService';

const onChange = (key) => {
  console.log(key);
};

export default class App extends Component {
  movieService = new MovieService();

  state = {
    movies: [],
  };

  textReduction = (text) => {
    let result = text.split('');

    for (let i = 0; i < result.length; i++) {
      if (i >= 200 && result[i] === ' ') {
        return `${result.splice(0, i).join('')}...`;
      }
    }
  };
  componentDidMount() {
    this.movieService.getResource().then(({ results }) => {
      console.log(results);
      this.setState({ movies: results });
    });
  }

  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="Search" centered={true} onChange={onChange}>
          <TabPane tab="Search" key="Search">
            <MovieList results={this.state.movies} textReduction={this.textReduction} />
          </TabPane>
          <TabPane tab="Rated" key="Rated"></TabPane>
        </Tabs>
      </div>
    );
  }
}
