import React, { useState, useEffect, useRef } from 'react';
import './phoneNumber.scss';

const PhoneNumber = (props) => {
    const { error} = props;

    const [phoneNumber, setPhoneNumber] = useState(new Array(3).fill(''));

    const inputRef0 = useRef();
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    const refs = [
        inputRef0,
        inputRef1,
        inputRef2,
    ];
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        
        let tempNumber = `5${phoneNumber.join("")}`;
        if(tempNumber.length == 9) {
            setErrorText('')
            props.callBack(tempNumber)
        } else if(tempNumber.length > 1) {
            setErrorText('არასწორი მობილურის ნომერი')
        } else if (tempNumber.length == 1) {
            setErrorText('')
        }
    }, [phoneNumber])

  
    

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
                if(phoneNumber[0].length < 1) return;
                if (phoneNumber[index] === '') {
                    refs[index - 1].current?.focus();
                }
            }
            return;
        };
    };

    const handleOnChange = (element, index, maxValue) => {
        console.log(element);
        if (isNaN(element.value)) return;
        setPhoneNumber([...phoneNumber.map((v, i) => (i === index) ? element.value : v)]);
        if (element.nextSibling && element.value.length == maxValue) element.nextSibling.focus();
    };

    
    return (
        <div className='phone-number-container'>
            <span className = 'label-head'>ტელეფონის ნომერი</span>
            <div className='phone-number-cont-body'>
                <span style={{color: 'white'}}>5</span>{phoneNumber.map((element, index) => (
                    <input
                       
                        className={index == 0? 'inp-1' : ''}
                        key={index}
                        ref={refs[index]}
                        value={element}
                        type='numeric'
                        maxLength={index == 0? 2 : 3}
                        onChange={e => handleOnChange(e.target, index, index == 0? 2 : 3)}
                        onKeyDown={e => handleFocusInput(e, index)}
                    />))}
            </div>
            {error || errorText? <span className = 'error-text'>{error || errorText}</span> : null}
        </div>
    );
};


export default PhoneNumber;