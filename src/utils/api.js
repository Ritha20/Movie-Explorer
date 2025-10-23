const API_BASE_URL = 'https://api.tvmaze.com';

export const api = {
  // Fetch all shows (movies)
  async getShows() {
    try {
      const response = await fetch(`${API_BASE_URL}/shows`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  // Fetch single show by ID
  async getShowById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/shows/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Search shows
  async searchShows(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
      const data = await response.json();
      return data.map(item => item.show);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }
};

//function to extract unique genres from movies
export const getUniqueGenres = (movies) => {
  const genres = new Set();
  movies.forEach(movie => {
    if (movie.genres) {
      movie.genres.forEach(genre => genres.add(genre));
    }
  });
  return ['All', ...Array.from(genres)].sort();
};