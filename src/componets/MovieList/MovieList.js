import React, { Component } from 'react';
import { List, Alert } from 'antd';

import './MovieList.css';
import Movie from '../Movie/Movie';

export default class MovieList extends Component {
  render() {
    const { movies, loading, totalResults, error, alertMessage, sendRateMovie, onChangePage } = this.props;
    const errorComponent = error ? <Alert message={alertMessage} type="warning" closable /> : null;

    return (
      <div>
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
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 20,
            total: totalResults,
            showSizeChanger: false,
            onChange: (page) => {
              onChangePage(page);
            },
          }}
          dataSource={movies}
          renderItem={(item) => (
            <List.Item>
              <Movie
                loading={loading}
                img={item.poster_path}
                movieId={item.id}
                title={item.title}
                date={item.release_date}
                genreId={item.genre_ids}
                overview={item.overview}
                voteAverage={item.vote_average}
                rating={item.rating}
                sendRateMovie={sendRateMovie}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
