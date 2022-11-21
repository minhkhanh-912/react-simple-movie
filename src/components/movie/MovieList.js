import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetcher, tmdAPI } from '../../config/config';
//https://api.themoviedb.org/3/movie/now_playing?api_key=88f202b349203f6fea5c8883c0eaa75d
const MovieList = ({type =  'now_playing'}) => {
    const [movies,setmovies] =  useState([]);
    const { data, error } = useSWR(tmdAPI.getMovieList(type), fetcher);
    useEffect(()=>{
       if(data && data.results) setmovies(data.results);
    }, [data]);
    return (
        <div className="movies-list">
            <Swiper
                grabCursor={"true"} 
                spaceBetween={40} 
                slidesPerView={"auto"}>
            {movies.length>0 &&
              movies.map((movie)=>(
                <SwiperSlide key={movie.id}>
                  <MovieCard item={movie}></MovieCard>
                </SwiperSlide>
              ))
              }
          </Swiper>
       </div>
    );
};

export default MovieList;