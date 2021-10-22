import React, { Fragment, useEffect, useState } from 'react';
import AppInput from '../AppInput/AppInput';
import DatePicker from '../DatePicker/DatePicker';
import RoundedChekBox from '../RoundedCheckBox/RoundedChekBox';


const errorTexts = [
    'არასწორი ელ-ფოსტის ფორმატი',
    'გთხოვთ შეავსოთ ველი',
    'პირადობის ნომერი არასწორია',
    'მობილურის ნომერი არასწორია'
]



const RegistrationPage = (props) => {
    const [name, setName] = useState({ value: '', error: '' });
    const [surname, setSurname] = useState({ value: '', error: '' });
    const [phoneNumber, setPhoneNumber] = useState({ value: '5', error: '' });
    const [personalNumber, setPersonalNumber] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [birthDate, setBirthDate] = useState({value: '', error: ''});
    const [district, setDistrict] = useState({ value: '', error: '' });
    const [gender, setGender] = useState({ male: false, female: false, other: false})
    const [hasAgreedTerms, setHasAgreedTerms] = useState(false);

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
        let tempNumber = phoneNumber.value.split("-");
        console.log(tempNumber);
        // tempNumber.map(e => {
        //     let i = e;
        //     if(i.length === 3) {
        //         i = i + "-";
        //         setPhoneNumber(prevState => {
        //             return {
        //                 ...prevState, 
        //                 value: i
        //             }
        //         });
        //     };
           
            
        // })
        // for(let i = 0; i<3; i++) {
        //     setPhoneNumber(prevState => {
        //         return {
        //             ...prevState,
        //             value: tempNumber[i] + "-"
        //         }
        //     })
        

        // if(rawPhoneNumber.length % 3 === 0) {
        //     setPhoneNumber(prevState => {
        //         return {...prevState, value: phoneNumber.value + "-"}
        //     })
        // }
        
    }, [phoneNumber.value])


    const handlePhoneNumber = (value) => {
        if (value.length < 1 || value.includes('.')) {
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
        if (isNaN(value) || value.includes('.')) {
            setPersonalNumber(prevState => {
                return { ...prevState };
            });
        } else {
            setPersonalNumber(prevState => {
                return { ...prevState, value: value };
            });
        };
    };

    const handleBirthDate = (value) => {
        console.log(value)
        setBirthDate(value)
    }

    const handleGender = (gender) => {
        if (gender === 'MALE') {
            setGender({ male: true, female: false, other: false });
        } else if (gender === 'FEMALE') {
            setGender({ male: false, female: true, other: false });
        } else {
            setGender({ male: false, female: false, other: true });
        }
    }


    const handleStep = () => {
        if (name.value.length < 1) {
            setName(prev => { return { ...prev, error: errorTexts[1] } });
            return;
        } else if (surname.value.length < 1) {
            setSurname(prev => { return { ...prev, error: errorTexts[1] } });
            return;
        } else if (personalNumber.value.length < 11) {
            setPersonalNumber(prev => { return { ...prev, error: errorTexts[2] } });
        } else if (email.error.length > 0 || email.value.length < 1) {
            return;
        } else if (!gender.female && !gender.male && !gender.other) {
            return
        } else if (!birthDate) {
            return;
        } else if (district.value.length < 1) {
            setDistrict(prev => { return { ...prev, error: errorTexts[2] } });
        } else if (!hasAgreedTerms) {
            return;
        }

        let regData = {
            personCode: personalNumber.value,
            birthDate: birthDate,
            firstName: name.value,
            lastname: surname.value,
            phone: phoneNumber.value,
            email: email.value,
            address: district.value,
            isApplyTerms: hasAgreedTerms,
            sex: gender.male ? 1 : gender.female ? 2 : 0

        }

        props.callBack(regData);
    }



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
                <AppInput
                    type='number-pad'
                    labeltext='ტელეფონის ნომერი'
                    value={phoneNumber.value}
                    errortext={phoneNumber.error}
                    maxLength={12}
                    onChange={(e) => handlePhoneNumber(e.target.value)} />
                <AppInput
                    type='number'
                    labeltext='პიდარი ნომერი'
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
                </div>
                <DatePicker callBack = {handleBirthDate}/>
                <AppInput
                    type='text'
                    labeltext='საცხოვრებელი უბანი'
                    value={district.value}
                    errortext={district.error}
                    onChange={(e) => setDistrict(prev => { return { ...prev, value: e.target.value } })} />

                <RoundedChekBox
                    labeltext='ვეთანხები წესებს და პირობებს'
                    hasLink
                    checked={hasAgreedTerms}
                    onHandleCheck={() => setHasAgreedTerms(!hasAgreedTerms)} />
            </div>
            <div className='reg-bottom-cont' >
                <button className='reg-button' onClick={handleStep}>შემდეგ</button>
            </div>
        </Fragment>
    );
};

export default RegistrationPage;