import React from 'react';
import './Progressbar.scss';

const progressBar = (props) => (
        <div>
            <progress
                className='Progress-main'
                min="0"
                max="100"
                id="seekProgress"
                value={props.value}
                onClick={props.clicked}>
            </progress>
        </div>
);

export default progressBar;