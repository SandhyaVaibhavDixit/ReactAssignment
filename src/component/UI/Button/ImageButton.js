import React from 'react';

import './ImageButton.css';

//Create custom button with image.
const ImageButton = (props) => (
    <button
        className="imagebutton"
        id={props.id}
        onClick={props.clicked}>
        <img id={props.imageId} src={props.buttonImage} alt={props.alt}></img>
    </button>
);

export default ImageButton;