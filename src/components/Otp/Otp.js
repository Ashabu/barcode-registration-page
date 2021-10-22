import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './otp.scss'

const Otp = (props) => {
    const { count, error, phoneNumber } = props;

    const [otp, setOtp] = useState(new Array(count).fill(''));

    const inputRef0 = useRef();
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();

    const refs = [
        inputRef0,
        inputRef1,
        inputRef2,
        inputRef3
    ];


    useEffect(() => {
        if (phoneNumber) {
            handleUserOtp(phoneNumber);
            return;
        };
        
    }, [phoneNumber]);

    

    const handleFocusInput = (event, index) => {
        if (refs[index + 1] && event.key === 'ArrowRight') {
            refs[index + 1].current?.focus();
            return;
        };
        if (refs[index - 1]) {
            if (event.key === 'ArrowLeft') {
                refs[index - 1].current?.focus();
            }
            if (event.key === 'Backspace' || event.key === 'Delete') {
                if (otp[index] === '') {
                    refs[index - 1].current?.focus();
                }
            }
            return;
        };
    };

    const handleOnChange = (element, index) => {
        if (isNaN(element.value)) return;
        setOtp([...otp.map((v, i) => (i === index) ? element.value : v)]);
        if (element.nextSibling && element.value !== '') element.nextSibling.focus();
    };

    const handleUserOtp = (value) => {
        axios.post(`https://citymallapi.payunicard.ge:8061/api/Otp/SendUserOtp`, { phone: value })
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e)
            });
    }

    return (
        <div className='otp-container'>
            <div className='otp-cont-top'>
                <p>გთხოვთ შეიყვანოთ მობილურ ნომერზე მიღებული ერთჯერადი კოდი</p>
            </div>
            <div className='otp-cont-body'>
                {otp.map((element, index) => (
                    <input
                        className='otp-input'
                        key={index}
                        ref={refs[index]}
                        value={element}
                        type='numeric'
                        maxLength='1'
                        onChange={e => handleOnChange(e.target, index)}
                        onKeyDown={e => handleFocusInput(e, index)}
                    />))}
            </div>
            {error ? <p style={{color: '#ff1212', textAlign: 'center'}}>{error}</p> : null}
                <p className = 'resend' onClick = {() => handleUserOtp(phoneNumber)} >თავიდან გამოგზავნა</p>
            <div className='otp-cont-bottom'>
                <button className='reg-button' onClick = {() => props.callBack(otp.join(""))}>რეგისტრაცია</button>
            </div>

        </div>
    );
};

export default Otp;