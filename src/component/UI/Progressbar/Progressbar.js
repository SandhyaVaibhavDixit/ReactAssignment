import React, { useState, useEffect } from 'react';
import './Progressbar.scss';

const ProgressBar = (props) => {
    const [progress, setProgress] = useState(null);

    useEffect(() =>{
        setProgress(document.getElementById('seekProgress'));
    },[]);

    return (
        <div>
            <progress
                className='Progress-main'
                min="0"
                max="100"
                id="seekProgress"
                value={props.value}
                // onClick={props.clicked}
                onClickCapture={props.clicked}>
            </progress>
        </div>
    )
};

export default ProgressBar;