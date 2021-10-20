import React, { useLayoutEffect, useState } from 'react';
import AppInput from '../AppInput/AppInput';
import RoundedChekBox from '../RoundedCheckBox/RoundedChekBox';

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [district, setDistrict] = useState('');
    const [hasAgreedTerms, setHasAgreedTerms] = useState(false);


    return (
        <div className='reg'>
            <img className='down' src='../../assets/images/arrow-down.png' alt='img' />
            <img className='up' src='../../assets/images/arrow-up.png' alt='img' />
            <div className='reg-container'>
                <div className='reg-top-cont'>
                    <img src='../../assets/images/citymall-logo.png' alt='logo' />
                </div>
                <div className='reg-input-cont'>
                    <p>რეგისტრაცია</p>
                    <AppInput
                        type='text'
                        labelText='სახელი'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <AppInput
                        type='text'
                        labelText='გვარი'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)} />
                    <AppInput
                        type='text'
                        labelText='ტელეფონის ნომერი'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)} />
                    <AppInput
                        type='text'
                        labelText='პიდარი ნომერი'
                        value={personalNumber}
                        onChange={(e) => setPersonalNumber(e.target.value)} />
                    <AppInput
                        type='text'
                        labelText='ელ-ფოსტა'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <AppInput
                        type='text'
                        labelText='დაბადების თარიღი'
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)} />
                    <AppInput
                        type='text'
                        labelText='საცხოვრებელი უბანი'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)} />

                    <RoundedChekBox
                        labelText='ვეთანხები წესებს და პირობებს'
                        onHandleCheck={() => setHasAgreedTerms(!hasAgreedTerms)} />
                </div>
                <div className='reg-bottom-cont'>
                    <button className='reg-button'>რეგისტრაცია</button>
                </div>

            </div>

        </div>
    );
};

export default RegistrationPage;