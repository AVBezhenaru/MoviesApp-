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

  // state = {
  //   movies: [],
  //   loading: true,
  // };

  // componentDidMount() {
  //   this.movieService.getResource().then(({ results }) => {
  //     this.setState({ movies: results, loading: false });
  //   });
  // }

  render() {
    console.log('render app');
    return (
      <div className="App">
        <Tabs defaultActiveKey="Search" centered={true} onChange={onChange}>
          <TabPane tab="Search" key="Search">
            <MovieList />
          </TabPane>
          <TabPane tab="Rated" key="Rated">
            sfd
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
