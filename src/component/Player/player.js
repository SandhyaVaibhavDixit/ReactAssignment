import React, { useState, useEffect, useCallback } from 'react';

import './player.css';
import Button from '../UI/Button/Button';
import PauseButtonImage from '../../assets/images/pause-button.png';
import PlayButtonImage from '../../assets/images/play-button.png';
import ProgressBar from '../UI/Progressbar/Progressbar';

const Player = props => {

    const [track, setTrack] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playButtonImageId, setPlayButtonImageId] = useState(null);
    const [timeSpanValue, setTimeSpanValue] = useState("00:00/00:00");
    const [percentage, setPercentage] = useState("0%");
    const [progressValue, setProgressValue] = useState(0);

    //Initializa all constants.
    const Init = () => {
        setTrack(props.song);
        setPlayer(document.getElementById('player'));
        setPlayButtonImageId(document.getElementById('imgPlay'));
    };

    useEffect(() => {
        Init()
    }, [Init]);

    //Format time seconds => mm:ss
    const formatTime = (currentTimeInSeconds) => {
        let hours = Math.floor(currentTimeInSeconds / 3600);
        let minutes = Math.floor((currentTimeInSeconds - (hours * 3600)) / 60);
        let seconds = currentTimeInSeconds - (hours * 3600) - (minutes * 60);

        let formatedTime = minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().padStart(2, '0');

        return formatedTime;
    }

    //Play button event handler.
    const playButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === false) {
            player.play();
            setIsPlaying(true);
            player.addEventListener('timeupdate', (event) => {
                const currentTime = Math.floor(player.currentTime);
                const duration = Math.floor(player.duration);
                setTimeSpanValue(formatTime(currentTime) + "\\" + formatTime(duration));

                const percentage = ((currentTime * 100) / duration).toFixed(2);
                setPercentage(percentage + "%");
                setProgressValue(percentage);
            }, false)
        }
        else {
            player.pause();
            setIsPlaying(false);
        }
        togglePlay();
    };

    //Toggle button image play => pause.
    const togglePlay = () => {
        if (playButtonImageId !== null && isPlaying === false) {
            playButtonImageId.src = PauseButtonImage;
            playButtonImageId.alt = "Pause";
        }
        else {
            playButtonImageId.src = PlayButtonImage;
            playButtonImageId.alt = "Play";
        }
    }

    //Progress bar clicked handler
    const progressBarClickedHandler = (event) => {
        let percent = event.screenX / event.currentTarget.offsetWidth;
        //event.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        const value = percent / 100;
        setProgressValue(value);
    }


    return (
        <div className="player">
            <div style={{ float: "left", paddingLeft: "40px" }}>
                <span id="timeElapsed">{timeSpanValue}</span>
            </div>
            <div style={{ float: "right", paddingRight: "40px" }}>
                <span id="percentage">{percentage}</span>
            </div>
            <br></br>
            <Button
                buttonImage={PlayButtonImage}
                id="btnPlay"
                imageId="imgPlay"
                alt="Play"
                clicked={playButtonClickedEventHandler}>
            </Button>
            <br></br>
            <ProgressBar value={progressValue} clicked={progressBarClickedHandler}></ProgressBar>
            <br></br>
            <audio preload="none" id="player" src={track} controls>
            </audio>
        </div>
    );
}

export default Player;