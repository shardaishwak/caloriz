import Fetch from ".";

const UnsplashSearch = async (query, per_page = 5) => {
  try {
    const results = (
      await Fetch(
        `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_KEY}&per_page=${per_page}&query=${query}`
      )
    ).results;

    return results.length > 0
      ? results.map((result) => ({
          id: result.id,
          color: result.color,
          description: result.description,
          alt_description: result.alt_description,
          urls: result.urls,
        }))
      : null;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  search: UnsplashSearch,
};
