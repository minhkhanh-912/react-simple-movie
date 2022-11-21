import React from 'react';

const LoadingSkeletons = (props)=>{
    return <div className={`skeleton ${props.className}`}
            style={{ 
            height:props.height,
            width: props.width || "100%",
            borderRadius:props.radius,
    }}></div>
}

export default LoadingSkeletons;