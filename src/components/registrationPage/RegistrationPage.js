import React, { useState } from 'react';
import AppInput from '../AppInput/AppInput';

const RegistrationPage = () => {
    const [text, setText ] = useState('');
    return (
        <div className = 'reg'>
            <img src = '../../assets/images/arrow-down.png' alt = 'img'/>
            <img src = '../../assets/images/arrow-up.png' alt = 'img' />
            <div className = 'reg-container'>
                <div className = 'reg-top-cont'>
                    <p>სითი მოლი</p>
                    <p>რეგისტრაცია</p>   
                </div>
                <div className = 'reg-input-cont'>
                    <AppInput type = 'text' labelText = 'email' value = {text} onChange = {(e) => setText(e.target.value)}/>
                    <input type = 'text' />
                    <input type = 'text' />
                    <input type = 'text' />
                    <input type = 'text' />
                    <input type = 'text' />
                    <input type = 'text' />
                    <input type = 'text' />
                </div>

            </div>
            
        </div>
    );
};

export default RegistrationPage;