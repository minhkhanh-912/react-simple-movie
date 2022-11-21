export const fetcher = (...args) => fetch(...args).then(res => res.json());
export const apikey = "88f202b349203f6fea5c8883c0eaa75d";

export const tmdAPI = {
    getMovieList: (type, page = 1)=>`https://api.themoviedb.org/3/movie/${type}?api_key=88f202b349203f6fea5c8883c0eaa75d&page=${page}`,
    getMovieSearch: (query,page)=>`https://api.themoviedb.org/3/search/movie?api_key=88f202b349203f6fea5c8883c0eaa75d&query=${query}&page=${page}`,
    getMovieDetails: (movieId)=>`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`,
    getMovieMeta: (movieId, type)=>`https://api.themoviedb.org/3/movie/${movieId}/${type}?api_key=${apikey}`,
    getImageOriginal: (url)=>`https://image.tmdb.org/t/p/original/${url}`,
    getImage500: (url)=>`https://image.tmdb.org/t/p/w500/${url}`
}