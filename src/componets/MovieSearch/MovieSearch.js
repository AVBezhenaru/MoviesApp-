import React, { Component } from 'react';

export default class MovieSearch extends Component {
  render() {
    return (
      <input
        type="search"
        placeholder="Type to search..."
        onChange={this.props.handleSearchKeyPress}
        className="moviesSearch"
      />
    );
  }
}
