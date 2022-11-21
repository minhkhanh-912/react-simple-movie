import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import LoadingSkeletons from '../components/Loading/LoadingSkeleton';
import MovieCard from '../components/movie/MovieCard';
import MovieCardSkeleton from '../components/movie/MovieCardSkeleton';
import { fetcher, tmdAPI } from '../config/config';
import useDebounce from '../hooks/useDebounce';
import {v4} from 'uuid';
import Button from '../components/Button/Button';
import useSWRInfinite from "swr/infinite";

const itemsPerPage = 20;
const MoviesPage1 = () => {
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    const [filter , setfiller] = useState("");
    const [nextpage , setnextpage] = useState(1);

    const [url , seturl] = useState(`${tmdAPI.getMovieList("popular",nextpage)}`)
    const fillterDebounce = useDebounce(filter,500);
    const hanedleFillterchange = (e)=>{
        setfiller(e.target.value);
    }

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (index) =>
          url.replace("page=1",`page=${index+1}`),
        fetcher
      );
      const movies = data? data.reduce((a,b)=> a.concat(b.results),[]):[];
      const loading = !data && !error;
    const isLoadingMore =
    loading ||
      (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.results.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
    // const { data, error } = useSWR(url, fetcher);



    useEffect(()=>{
        if(fillterDebounce) seturl(`${tmdAPI.getMovieSearch(fillterDebounce,nextpage)}`);
        else seturl(`${tmdAPI.getMovieList("popular",nextpage)}`);
    },[fillterDebounce, nextpage])

    useEffect(() => {
        if(!data || !data.total_results) return;
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setnextpage(event.selected+1);
    };
    return (
      <>
            <div className="py-5 page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text" 
                            className="w-full outline-none bg-slate-800 text-white p-4 rounded-l-lg" 
                            placeholder='type of search' 
                            onChange={hanedleFillterchange}
                            />
                </div>
                <button className="p-4 bg-primary text-white rounded-r-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div> 
            {loading && (<div className="grid grid-cols-4 gap-10">
                    {
                        new Array(20).fill(0).map(()=>(
                            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                        ))
                    }
            </div>)}
            {!loading && <div className="grid grid-cols-4 gap-10">
                {movies.length>0 &&
                    movies.map((movie)=>(
                        <MovieCard key={movie.id} item={movie}/>
                    ))
                }
             </div>}
             <div className="mt-10 flex justify-center">
                <Button onClick={isReachingEnd ? {} : () => setSize(size + 1)}
                    disabled={isLoadingMore || isReachingEnd}
                    >{isLoadingMore
                    ? "loading..."
                    : isReachingEnd
                    ? "no more issues"
                    : "load more"}</Button>

             {/* <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                /> */}
             </div>
        </div>
      </>
    );
};

export default MoviesPage1;