import React from 'react';

import './Button.scss';

//Create custom button
const button = (props) => (
    <button
        className="button"
        id={props.id}
        onClick={props.clicked}>
        <img id={props.imageId} src={props.buttonImage} alt={props.alt}></img>
    </button>
);

export default button; 