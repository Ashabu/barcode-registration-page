import React, { useState } from 'react';
import './datePicker.scss';

const DateSelect = (props) => {

    const valueTranslate = (value) => {
        if (props.pickType === 'month') {
            let month;
            switch (value) {
                case '01':
                    month = 'იანვარი'
                    break;
                case '02':
                    month = 'თებერვალი'
                    break;
                case '03':
                    month = 'მარტი'
                    break;
                case '04':
                    month = 'აპრილი'
                    break;
                case '05':
                    month = 'მაისი'
                    break;
                case '06':
                    month = 'ივნისი'
                    break;
                case '07':
                    month = 'ივლისი'
                    break;
                case '08':
                    month = 'აგვისტო'
                    break;
                case '09':
                    month = 'სექტემბერი'
                    break;
                case '10':
                    month = 'ოქტომბერი'
                    break;
                case '11':
                    month = 'ნოემბერი'
                    break;
                case '12':
                    month = 'დეკემბერი'
                    break;
                default:
                    break;
            }
            return month;
        } else {
            return value
        }
    }

    return (
        <div className='date-select '>
            <select name={props.name} value={props.startValue} onChange={(e) => props.callBack(e.target.value)}>
                <option value='' disabled >{props.name}</option>
                {props.data?.map((el, i) => (
                    <option key={el + 'index'} value={el}>
                        {valueTranslate(el)}
                    </option>
                ))}
            </select>
            <img src='../../assets/images/select-arrow.png' />
        </div>
    );
};

export default DateSelect;