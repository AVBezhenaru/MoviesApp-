export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '5e934ccb637dcc4960ac5240a0cd08d9';

  async getResource(url, option) {
    try {
      const res = await fetch(url, option);
      if (!res.ok) {
        throw new Error('Oops, Your request did not result');
      }

      return res.json();
    } catch (e) {
      const error = new Error(e);
      if (error.message === 'TypeError: Failed to fetch') {
        error.message = 'Oops, something went wrong, please check your internet connection';
      }
      throw error;
    }
  }

  async getMovies(query, pageNumber = 1) {
    return this.getResource(`${this._apiBase}search/movie?query=${query}&page=${pageNumber}&api_key=${this._apiKey}`);
  }

  async getRatedMovies(guestSession) {
    return this.getResource(
      `${this._apiBase}guest_session/${guestSession}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.asc`
    );
  }

  async authentication() {
    return this.getResource(`${this._apiBase}authentication/guest_session/new?api_key=${this._apiKey}`);
  }

  async sendRateMovie(movieId, rate, sessionId) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rate }),
    };
    return this.getResource(
      `${this._apiBase}movie/${movieId}/rating?guest_session_id=${sessionId}&api_key=${this._apiKey}`,
      requestOptions
    );
  }

  async getGenres() {
    return this.getResource(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}`);
  }
}
