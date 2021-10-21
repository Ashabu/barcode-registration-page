import React, {useEffect, useState} from 'react';
import './appInput.scss';

const AppInput = (props) => {
    const {htmlFor, labeltext, errortext } = props;

    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        if(props.value == '') {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [props.value])

    return (
        <div id="float-label">
            <input  {...props} />
            <label className={ isActive  || props.type == 'date'? "Active" : ""} htmlFor={htmlFor}>
                {labeltext}
            </label>
           {errortext? <span>{errortext}</span> : null}
        </div>
    );
};

export default AppInput;