export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '5e934ccb637dcc4960ac5240a0cd08d9';
  query = 'terminator';

  async getResource() {
    const res = await fetch(`${this._apiBase}search/movie?query=${this.query}&page=1&api_key=${this._apiKey}`);

    if (!res.ok) {
      throw new Error('Could not fetch');
    }
    return res.json();
  }
}
