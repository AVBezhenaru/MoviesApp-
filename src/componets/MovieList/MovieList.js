import React from 'react';
import { List } from 'antd';

import Movie from '../Movie/Movie';

const MovieList = ({ results, textReduction }) => {
  console.log(results);
  return (
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
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
      }}
      dataSource={results}
      renderItem={(item) => (
        <List.Item>
          <Movie
            img={item.poster_path}
            title={item.title}
            date={item.release_date}
            genre={item.genre_ids}
            overview={textReduction(item.overview)}
            rating={item.vote_average}
          />
        </List.Item>
      )}
    />
  );
};

export default MovieList;
