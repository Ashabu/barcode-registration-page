import React from 'react';
import './checkBox.scss';

const RoundedChekBox = (props) => {

    const {checked, labelText, onHandleCheck} = props;

    return (
        <div className="container" onClick = {onHandleCheck}>
            <div className="round">
            <span style = {{color: 'white'}}>{labelText}</span>
                <input type="checkbox" checked = {checked} id="checkbox" />
                <label htmlFor="checkbox"></label>
            </div>
        </div>
    );
};

export default RoundedChekBox;