import React, { Fragment } from 'react';
import './layout.scss';

const Layout = (props) => {
    return (
        <div className='app-layout'>
            <div className='arrows down'>
                <img  src='../../assets/images/arrow-down.png' alt='img' />
            </div>
            <div className='layout-logo'>
                <img src='../../assets/images/citymall-logo.png' alt='logo' />
                
            </div>
            <div className = 'app-layout-body'>
            {props.children}
            </div>
            
            <div className='arrows up'>
                <img src='../../assets/images/arrow-up.png' alt='img' />
                <img  src = '../../assets/images/visa-logo_1.png' alt= 'visa-logo'/>
            </div>
        </div>
    );
};

export default Layout;