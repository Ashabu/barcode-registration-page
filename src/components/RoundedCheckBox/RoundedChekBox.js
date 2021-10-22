import React from 'react';
import './checkBox.scss';

const RoundedChekBox = (props) => {

    const { checked, id, labeltext, onHandleCheck, hasLink } = props;

    return (
        <div className="container" onClick={onHandleCheck}>
            <div className="round" >
                {hasLink ?
                    <a href="https://google.com" target="_blank">{labeltext}</a>
                    :
                    <span style={{ color: 'white' }}  >{labeltext}</span>}
                <input type="checkbox" checked={checked} id={id} onChange={onHandleCheck} />
                <label htmlFor={id}></label>
            </div>
        </div>
    );
};

export default RoundedChekBox;