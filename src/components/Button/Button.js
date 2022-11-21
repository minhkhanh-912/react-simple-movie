import React from 'react';

const Button = ({onClick , className = '' , type = "button" , bgColor = "primary" , children,...props}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName  = "bg-primary";
            break;
        case "secondary":
            bgClassName  = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <button 
            onClick={onClick} 
            type={type}
            className={`py-3 px-6 rounded-lg capitalize text-xl 
                    bg-primary font-medium flex justify-center 
                    items-center gap-x-2 mt-auto ${bgClassName} ${className}`}
            {...props}>
            {children}
        </button>
    );
};

export default Button;