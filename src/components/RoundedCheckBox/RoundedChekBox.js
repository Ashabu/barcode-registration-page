import React from 'react';
import './checkBox.scss';

const RoundedChekBox = (props) => {

    const {checked, labeltext, onHandleCheck} = props;

    return (
        <div className="container" onClick = {onHandleCheck}>
            <div className="round" onClick = {onHandleCheck}>
            <span style = {{color: 'white'}}  >{labeltext}</span>
                <input type="checkbox" checked = {checked} id="checkbox" />
                <label htmlFor="checkbox"></label>
            </div>
        </div>
    );
};

export default RoundedChekBox;