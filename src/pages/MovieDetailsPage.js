import React from 'react';
import { useParams } from 'react-router-dom';
import { SwiperSlide , Swiper} from 'swiper/react';
import useSWR from 'swr';
import { apikey, fetcher, tmdAPI } from '../config/config';
import { Navigation, A11y } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import MovieCard from '../components/movie/MovieCard';
const MovieDetailsPage = () => {
    const {movieId} = useParams();
    const { data, error } = useSWR(tmdAPI.getMovieDetails(movieId), fetcher);
    if(!data) return null;
    const {backdrop_path , poster_path , title, genres,overview} = data;
    return (
        <div className="pb-10">
            <div className="w-full h-[600px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="w-full h-full bg-cover bg-no-repeat" style={{
                    backgroundImage: `url(${tmdAPI.getImageOriginal(backdrop_path)})`
                }}>
                </div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img src={`${tmdAPI.getImageOriginal(poster_path)}`} alt="" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h1 className="text-center text-3xl font-bold text-white mb-10">{title}</h1>
            <div className="flex items-center gap-x-5 mb-10 justify-center">
                {genres.length > 0 && genres.map(item =>(
                    <span className="py-2 px-4 border border-primary text-primary rounded-3xl" key={item.id}>{item.name}</span>
                ))}
            </div>
            <p className="text-center leading-relaxed max-w-[600px] mx-auto text-white mb-10">{overview}</p>
            <MovieCredits></MovieCredits>
            <MovieVideo></MovieVideo>
            <MovieSimilar></MovieSimilar>
        </div>
    );
};
const MovieCredits = ()=>{
    const {movieId} = useParams();
    const { data, error } = useSWR(tmdAPI.getMovieMeta(movieId,'credits'), fetcher);
    if(!data) return null;
    const {cast} = data;
    if(!cast || cast.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-center text-2xl font-bold text-white mb-10">Casts</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 8).map(item => (
                    <div className="cast-item" key={item.id}>
                        <img src={`${tmdAPI.getImageOriginal(item.profile_path)}`} className="w-full h-[300px] object-cover rounded-lg mb-3" alt="" />
                        <h3 className="text-xl text-white font-medium">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
const MovieVideo = ()=>{
    const {movieId} = useParams();
    const { data, error } = useSWR(tmdAPI.getMovieMeta(movieId,'videos'), fetcher);
    if(!data) return null;
    const {results} = data;
    if(!results || results.length <= 0) return null;
    console.log(data);
    return (
        <div className="py-10">
            {results.slice(0, 1).map(item => (
                    <div className="w-full aspect-video" key={item.id}>
                        <iframe 
                        width="956"
                        height="538" 
                        src={`https://www.youtube.com/embed/${item.key}`}
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"></iframe>
                    </div>
                ))}
        </div>
    )
}
const MovieSimilar = ()=>{
    const {movieId} = useParams();
    const { data, error } = useSWR(tmdAPI.getMovieMeta(movieId,'similar'), fetcher);
    if(!data) return null;
    const {results} = data;
    if(!results || results.length <= 0) return null;
    console.log(data);
    return (
        <div className="py-10   ">
            <h2 className="text-center text-2xl font-bold text-white mb-10">Similar movies</h2>
            <div className="movies-list">
                <Swiper modules={[Navigation]} 
                        grabCursor={"true"} 
                        spaceBetween={40}
                        navigation
                        slidesPerView={"auto"}>
                    {results.length>0 &&
                        results.map((movie)=>(
                        <SwiperSlide key={movie.id}>
                        <MovieCard item={movie}></MovieCard>
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
            </div>
        </div>
    )
}
export default MovieDetailsPage;