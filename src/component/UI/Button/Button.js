import React from 'react';

import './Button.scss';

//Create custom button with pure css.
const button = (props) => (
    <button
        className={props.class}
        id={props.id}
        onClick={props.clicked}>
    </button>
);

export default button; 