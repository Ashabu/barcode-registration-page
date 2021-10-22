import React, { Fragment, useEffect, useState } from 'react';
import AppInput from '../AppInput/AppInput';
import DatePicker from '../DatePicker/DatePicker';
import PhoneNumber from '../PhoneNumber/PhoneNumber';
import RoundedChekBox from '../RoundedCheckBox/RoundedChekBox';



const errorTexts = [
    'არასწორი ელ-ფოსტის ფორმატი',
    'გთხოვთ შეავსოთ ველი',
    'პირადობის ნომერი არასწორია',
    'მობილურის ნომერი არასწორია',
    'გთხოვთ აირჩიოთ სქესი',
    'გთხოვთ დაეთანხმოთ წესებს და პირობებს'
]



const RegistrationPage = (props) => {
    const [name, setName] = useState({ value: '', error: '' });
    const [surname, setSurname] = useState({ value: '', error: '' });
    const [phoneNumber, setPhoneNumber] = useState({ value: '5', error: '' });
    const [personalNumber, setPersonalNumber] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [birthDate, setBirthDate] = useState();
    const [district, setDistrict] = useState('');
    const [gender, setGender] = useState({ male: false, female: false, other: false, error: '' })
    const [hasAgreedTerms, setHasAgreedTerms] = useState({ value: false, error: '' });

    useEffect(() => {
        if (email.value.length == 0) {
            setEmail(prev => { return { ...prev, error: '' } });
        } else {
            let regex = /\S+@\S+\.\S+/;
            if (regex.test(email.value)) {
                setEmail(prev => { return { ...prev, error: '' } });
            } else {
                setEmail(prev => { return { ...prev, error: errorTexts[0] } });
            };
        };
    }, [email.value]);

    useEffect(() => {
        if (personalNumber.value.length === 11 || personalNumber.value.length === 0) {
            setPersonalNumber(prev => { return { ...prev, error: '' } });
        } else {
            setPersonalNumber(prev => { return { ...prev, error: errorTexts[2] } });
        };
    }, [personalNumber.value]);

    useEffect(() => {
        if(phoneNumber.value.length <= 1 || phoneNumber.value.length === 9) {
            setPhoneNumber(prevState => {
                return { ...prevState, error: '' };
            });
        } else {
            setPhoneNumber(prevState => {
                return { ...prevState, error: errorTexts[3] };
            });
        }
    }, [phoneNumber.value])



    // const handlePhoneNumber = (value) => {
    //     console.log(value)
    //     setPhoneNumber(value);
    // };
    const handlePhoneNumber = (value) => {
        if (isNaN(value) || value.length < 1 || value.includes('.')) {
            setPhoneNumber(prevState => {
                return { ...prevState };
            });
        } else {
            setPhoneNumber(prevState => {
                return { ...prevState, value: value };
            });
        };
    };

    const handlePersonalNumber = (value) => {
        if (isNaN(value) || value.includes('.') || value.length > 11) {
            setPersonalNumber(prev => {
                return { ...prev };
            });
        } else {
            setPersonalNumber(prev => {
                return { ...prev, value: value };
            });
        };
    };

    const handleBirthDate = (value) => {
        console.log(value)
        setBirthDate(value)
    }

    const handleGender = (gender) => {
        if (gender.error !== '') {
            setGender(prev => {
                return { ...prev, error: '' };
            });
        };
        if (gender === 'MALE') {
            setGender(prev => {
                return { ...prev, male: true, female: false, other: false }
            });
        } else if (gender === 'FEMALE') {
            setGender(prev => {
                return { ...prev, male: false, female: true, other: false }
            });
        } else {
            setGender(prev => {
                return { ...prev, male: false, female: false, other: true }
            });
        };
    };

    const handleStep = () => {
        if (name.value.length < 1) {
            setName(prev => { return { ...prev, error: errorTexts[1] } });
            return;
        } else if (surname.value.length < 1) {
            setName(prev => { return { ...prev, error: '' } });
            setSurname(prev => { return { ...prev, error: errorTexts[1] } });
            return;
        } else if (phoneNumber.length < 12) {
            return;
        } else if (personalNumber.value < 1 || personalNumber.error.length) {
            setSurname(prev => { return { ...prev, error: '' } });
            return;
        } else if (email.error.length > 0 || email.value.length < 1) {
            setEmail(prev => { return { ...prev, error: errorTexts[1] } });
            return;
        } else if (!gender.female && !gender.male && !gender.other) {
            setGender(prev => { return { ...prev, error: errorTexts[4] } })
            return;
        } else if (!birthDate) {
            setGender(prev => { return { ...prev, error: '' } })
            return;
        } else if (district == "") {
            return
        } else if (!hasAgreedTerms.value) {
            
            setHasAgreedTerms(prev => { return { ...prev, error: errorTexts[5] } })
            return;
        }

        let regData = {
            personCode: personalNumber.value,
            birthDate: birthDate,
            firstName: name.value,
            lastname: surname.value,
            phone: phoneNumber.value,
            email: email.value,
            address: district,
            isApplyTerms: hasAgreedTerms.value,
            sex: gender.male ? 1 : gender.female ? 2 : 0
        }
        props.callBack(regData);
    };

    


    return (
        <Fragment>
            <div className='reg-input-cont'>
                <p>რეგისტრაცია</p>
                <AppInput
                    type='text'
                    labeltext='სახელი'
                    value={name.value}
                    errortext={name.error}
                    onChange={(e) => setName(prev => { return { ...prev, value: e.target.value.trim() } })} />
                <AppInput
                    type='text'
                    labeltext='გვარი'
                    value={surname.value}
                    errortext={surname.error}
                    onChange={(e) => setSurname(prev => { return { ...prev, value: e.target.value.trim() } })} />
                {/* <PhoneNumber callBack={handlePhoneNumber} /> */}
                <AppInput
                    type='numeric'
                    labeltext='ტელეფონის ნომერი'
                    value={phoneNumber.value}
                    errortext={phoneNumber.error}
                    maxLength={9}
                    onChange={(e) => handlePhoneNumber(e.target.value)} />
                <AppInput
                    type='numeric'
                    labeltext='პირადი ნომერი'
                    value={personalNumber.value}
                    errortext={personalNumber.error}
                    maxLength={11}
                    onChange={(e) => handlePersonalNumber(e.target.value)} />
                <AppInput
                    type='text'
                    labeltext='ელ-ფოსტა'
                    value={email.value}
                    errortext={email.error}
                    onChange={(e) => setEmail(prev => { return { ...prev, value: e.target.value } })} />
                <div className='float-label' >
                    <p>სქესი</p>
                    <RoundedChekBox
                        labeltext='მამრობითი'
                        id='male'
                        checked={gender.male}
                        onHandleCheck={() => handleGender('MALE')} />
                    <RoundedChekBox
                        labeltext='მდედრობითი'
                        id='female'
                        checked={gender.female}
                        onHandleCheck={() => handleGender('FEMALE')} />
                    <RoundedChekBox
                        labeltext='არ მსურს გავამჟღავნო'
                        id='other'
                        checked={gender.other}
                        onHandleCheck={() => handleGender('OTHER')} />
                    {gender.error ? <span className='error-text'>{gender.error}</span> : null}
                </div>
                <DatePicker callBack={handleBirthDate} />
                <AppInput
                    type='text'
                    
                    labeltext='საცხოვრებელი უბანი'
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)} />

                <RoundedChekBox
                    labeltext='ვეთანხები წესებს და პირობებს'
                    hasLink
                    checked={hasAgreedTerms.value}
                    onHandleCheck={() => setHasAgreedTerms({ value: !hasAgreedTerms.value, error: '' })} />
                {!hasAgreedTerms.error ? <span className='error-text'>{hasAgreedTerms.error}</span> : null}
            </div>
            <div className='reg-bottom-cont' >
                <button className='reg-button' onClick={handleStep}>შემდეგი</button>
            </div>
        </Fragment>
    );
};

export default RegistrationPage;