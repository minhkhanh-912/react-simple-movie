import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, A11y } from 'swiper';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import ModalAdvanced from '../Modal/ModalAdvanced';

const Banner = () => {
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=88f202b349203f6fea5c8883c0eaa75d`, fetcher);
    const movies = data?.results || [];
    return (
        <>
        <section className="banner h-[400px] page-container mb-20">
        <Swiper modules={[Navigation, Pagination, A11y ,Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={true}
                navigation
                pagination={{ clickable: true }}>
            {movies.length > 0 && movies.map((item) => (
                <SwiperSlide key={item.id}>
                    <BannerItem item={item} ></BannerItem>
                 </SwiperSlide>
            ))}
        </Swiper>
        </section>
        </>
    );
};

const BannerItem = ({item})=>{
    const {id}= item;
    const navigate = useNavigate();
    const [showModal , setshowModal] = useState(false);
    return (
        <div className="w-full h-full rounded-lg bg-white relative">
            <div className="over-lay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)]"></div>
            <img
                src={`https://image.tmdb.org/t/p/original`+item.poster_path}
                alt=""
                className="w-full h-full object-cover rounded-lg mb-5"
                />
            <div className="content absolute left-5 bottom-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-3">{item.title}</h2>
            <div className="flex items-center gap-x-3 mb-8">
                <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
                <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
                <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
            </div>
            <div className="flex gap-x-5">
            <Button onClick={() =>navigate(`/movies/${item.id}`)} className="w-auto" >Play</Button>
            <Button onClick={()=>{setshowModal(true)}} className="w-auto" >Info more</Button>
            <ModalAdvanced visible={showModal} onClose={()=>setshowModal(false)}>
                <div className="w-full w-[800px] h-auto bg-slate-600 rounded-lg">
                    <div className="w-full h-[500px] relative">
                        <div className="over-lay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)]"></div>
                        <span className="absolute z-90 top-1 right-1 w-10 h-10 bg-white rounded-full cursor-pointer" onClick={()=>setshowModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></span>
                        <img src={`https://image.tmdb.org/t/p/original`+item.poster_path} alt="" 
                        className="z-2 w-full h-full object-cover rounded-lg"/>
                        <h1 className="text-white text-3xl font-bold absolute bottom-10 left-3 z-10">{item.title}</h1>
                    </div>
                </div>
            </ModalAdvanced>
            </div>
            </div>
        </div>
    )
}
export default Banner;