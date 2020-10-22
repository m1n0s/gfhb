import axios from 'axios';

class GiphyAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.giphy.com/v1',
      params: {
        api_key: process.env.REACT_APP_GIPHY_API_KEY,
      },
    });
  }

  findGifs(term) {
    return this.axios.get('gifs/search', {
      params: {
        q: term,
        limit: 25,
      },
    });
  }
}

export default new GiphyAPI();
