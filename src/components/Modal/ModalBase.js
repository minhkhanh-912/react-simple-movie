import React from 'react';
import Portal from '../Portal';
import { CSSTransition } from 'react-transition-group';

const ModalBase = ({visible,onClose,children}) => {

    return (
        <>
            <CSSTransition in={visible} unmountOnExit timeout={250} classNames="zoom">
            {(status)=>(
                <Portal visible={status !== "exited"} onClose={onClose} conttainerClassName="flex justify-center items-center"
                    bodyStyle = {{transition: "all 250ms"}}
                >
                    {children}
                </Portal>
            )}
            </CSSTransition>
        </>
    );
};

export default ModalBase;