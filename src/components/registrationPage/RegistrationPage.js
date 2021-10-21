import React, { Fragment, useEffect, useState } from 'react';
import AppInput from '../AppInput/AppInput';
import RoundedChekBox from '../RoundedCheckBox/RoundedChekBox';
import DatePicker from "react-datepicker";





const RegistrationPage = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('995');
    const [personalNumber, setPersonalNumber] = useState('');
    const [email, setEmail] = useState('');
    const [validEmailError, setValidEmailError] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [district, setDistrict] = useState('');
    const [hasAgreedTerms, setHasAgreedTerms] = useState(false);

    useEffect(() => {
        if(email.length == 0) {
            setValidEmailError('');
        } else {
            let regex =  /\S+@\S+\.\S+/;
            if(regex.test(email)) {
                setValidEmailError('');
            } else {
                setValidEmailError('არასწორი ელ-ფოსტის ფორმატი')
            }
        }
    }, [email])
       
    
    const handlePhoneNumber = (value) => {
        console.log(value)
        if(isNaN(value) || value.length < 4 || value.includes('.')) {
            setPhoneNumber(prevState => {
                return prevState;
            });
        } else {
            setPhoneNumber(value)
        };
    };

    const handlePersonalNumber = (value) => {
        if(isNaN(value) || value.includes('.')) {
            setPersonalNumber(prevState => {
                return prevState;
            });
        } else {
            setPersonalNumber(value)
        };
    };

    const regData = {

    }




    return (
            <Fragment>
                <div className='reg-input-cont'>
                    <p>რეგისტრაცია</p>
                    <AppInput
                        type='text'
                        labeltext='სახელი'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <AppInput
                        type='text'
                        labeltext='გვარი'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)} />
                    <AppInput
                        type='numeric'
                        labeltext='ტელეფონის ნომერი'
                        value={phoneNumber}
                        maxLength = {13}
                        onChange={(e) => handlePhoneNumber(e.target.value)} />
                    <AppInput
                        type='numeric'
                        labeltext='პიდარი ნომერი'
                        value={personalNumber}
                        maxLength = {11}
                        onChange={(e) => handlePersonalNumber(e.target.value)} />
                    <AppInput
                        type='text'
                        labeltext='ელ-ფოსტა'
                        value={email}
                        errortext = {validEmailError}
                        onChange={(e) => setEmail(e.target.value)} />
                    <AppInput
                        type='date'
                        labeltext='დაბადების თარიღი'
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)} />
                        {/* <DatePicker /> */}
                    <AppInput
                        type='text'
                        labeltext='საცხოვრებელი უბანი'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)} />

                    <RoundedChekBox
                        labeltext ='ვეთანხები წესებს და პირობებს'
                        onHandleCheck={() => setHasAgreedTerms(!hasAgreedTerms)} />
                </div>
                <div className='reg-bottom-cont' onClick = {()=> {props.callBack(phoneNumber)}}>
                    <button className='reg-button'>რეგისტრაცია</button>
                </div>
            </Fragment>
    );
};

export default RegistrationPage;