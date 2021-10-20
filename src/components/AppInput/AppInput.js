import React, {useEffect, useState} from 'react';
import './appInput.scss';

const AppInput = (props) => {
    const {htmlFor, labelText, value, onChange, type} = props;

    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        if(value == '') {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [value])

    return (
        <div id="float-label">
            <input type={type} value = {value} onChange = {onChange} />

            <label className={ isActive ? "Active" : ""} htmlFor={htmlFor}>
                {labelText}
            </label>
        </div>
    );
};

export default AppInput;