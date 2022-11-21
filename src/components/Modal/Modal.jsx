import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../dropdown/Dropdown';

const Modal = ({open = false , handleClose = ()=>{}}) => {
    if(typeof document === 'undefined') return <div className="modal"></div>;
    return ReactDOM.createPortal(<div className={`modal fixed flex justify-center items-center inset-0 z-50 ${open ? "":"opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-gray-500 bg-opacity-25" onClick={handleClose}>
        </div>
        <div className="modal-content bg-white relative z-10 p-10 max-w-[482px] w-full">
            <div className="absolute right-0 top-0" onClick={handleClose}>X</div>
            <input type="text" className="border p-5 w-full" />
        </div>
    </div>,document.querySelector("body"));
};

export default Modal;