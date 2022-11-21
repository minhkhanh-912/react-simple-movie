import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react/cjs/react.development';
import PropTypes from 'prop-types';

const createPortalWrapper = () => {
    const element = document.createElement('div');
    element.id = 'portal-wrapper';

    return element;
}
const portalWrapperElement = createPortalWrapper();
const Portal = ({
    conttainerClassName="",
    bodyClassName="",
    containerStyle={},
    bodyStyle={},
    onClose= () => {},
    visible = false,
    children
    }) => {
    useEffect(()=>{
        document.body.appendChild(portalWrapperElement);
    },[]);
    const renderContent = (<div className={`fixed inset-0 z-[9999]  ${conttainerClassName}`} style={containerStyle}>
    <div className="over-lay absolute inset-0 bg-black bg-opacity-20" onClick={onClose}></div>
    <div className={`content relative z-10 ${bodyClassName}` } style={bodyStyle}>
        {children}
    </div>
    </div>);
    return createPortal(renderContent,portalWrapperElement);
};
Portal.propTypes = {
    conttainerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    onClose: PropTypes.func,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node,
};
export default Portal;


