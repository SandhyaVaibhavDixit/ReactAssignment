import React from 'react';

import './Button.scss';

//Create custom button with image.
// const button = (props) => (
//     <button
//         className="button"
//         id={props.id}
//         onClick={props.clicked}>
//         <img id={props.imageId} src={props.buttonImage} alt={props.alt}></img>
//     </button>
// );

//Create custom button with pure css.
const button = (props) => (
    <button
        className={props.class}
        id={props.id}
        onClick={props.clicked}>
    </button>
);

export default button; 