import React, { memo } from 'react';
import MovieList from '../components/movie/MovieList';

const HomePage = memo(() => {
    return (
        <>
            <section className="movies_layout  page-container pb-20">
                <div className="flex justify-between items-center">
                    <h2 className="capitalize text-white mb-10 text-3xl font-bold">Now playing</h2>
                </div>
            <div className="movies-list">
                <MovieList></MovieList>
            </div>
            </section>
            <section className="movies_layout  page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Top rate</h2>
                <div className="movies-list">
                <MovieList type='top_rated'></MovieList>
            </div>
            </section>
            <section className="movies_layout  page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">trending</h2>
                <div className="movies-list">
                <MovieList type='popular'></MovieList>
            </div>
            </section>
        </>
    );
});

export default HomePage;