import React from 'react';
import './layout.scss';

const Layout = (props) => {
    return (
        <div className='app-layout'>
            <img className='down' src='../../assets/images/arrow-down.png' alt='img' />
            <img className='up' src='../../assets/images/arrow-up.png' alt='img' />
                <div className='layout-logo'>
                    <img src='../../assets/images/citymall-logo.png' alt='logo' />
                </div>
                <div className = "app-layout-body">
                    {props.children}
                </div>
        </div>
    );
};

export default Layout;