import React from 'react';
import './Progressbar.scss';

const progressBar = (props) => {
    return (
        <div>
            <progress
                className='Progress-main'
                min="0"
                max="100"
                value={props.value}
                // onClick={props.clicked}
                onClickCapture={props.clicked}>
            </progress>
        </div>
    )
};

export default progressBar;