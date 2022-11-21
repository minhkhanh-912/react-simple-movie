import React from 'react';
import LoadingSkeletons from '../Loading/LoadingSkeleton';

const MovieCardSkeleton = (props) => {
    return (
        <>
            <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
                <LoadingSkeletons width="100%" height="250px" className="mb-5"></LoadingSkeletons>
                <div className="flex flex-col flex-1">
                <h3 className=" text-xl font-bold mb-3"><LoadingSkeletons width="100%" height="20px"></LoadingSkeletons></h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-5">
                    <span><LoadingSkeletons width="50px" height="10px"></LoadingSkeletons></span>
                    <span><LoadingSkeletons width="50px" height="10px"></LoadingSkeletons></span>
                </div>
                <LoadingSkeletons width="100%" height="40px"></LoadingSkeletons>
                </div>
            </div>
        </>
    );
};

export default MovieCardSkeleton;