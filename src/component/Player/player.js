import React, { useState, useEffect, useCallback } from 'react';

import './player.css';
import Button from '../UI/Button/Button';
import ImageButton from '../UI/Button/ImageButton';

import StopButtonImage from '../../assets/images/stop.png';
import VolumnButtonImage from '../../assets/images/volumn.png';
import VolumnPlusButtonImage from '../../assets/images/plus.png';
import VolumnMinusButtonImage from '../../assets/images/minus.png';

import ProgressBar from '../UI/Progressbar/Progressbar';

const Player = props => {

    const [track, setTrack] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [playButtonImageId, setPlayButtonImageId] = useState(null);
    const [timeSpanValue, setTimeSpanValue] = useState("00:00/00:00");
    const [percentage, setPercentage] = useState("0%");
    const [progressValue, setProgressValue] = useState(0);

    //Initializa all constants.
    const Init = () => {
        setTrack(props.song);
        setPlayer(document.getElementById('player'));
        // setPlayButtonImageId(document.getElementById('imgPlay'));
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
    };

    //Toggle button image play => pause.
    // const togglePlay = () => {
    //playButtonImageId.toggleClass("paused");
    // if (playButtonImageId !== null && isPlaying === false) {
    //     playButtonImageId.src = PauseButtonImage;
    //     playButtonImageId.alt = "Pause";
    // }
    // else {
    //     playButtonImageId.src = PlayButtonImage;
    //     playButtonImageId.alt = "Play";
    // }
    // }

    //Progress bar clicked handler
    const progressBarClickedHandler = (event) => {
        console.log(event);
    }

    //Stop button click handler.
    const stopButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === true) {
            player.pause();
            player.currentTime = 0;
            setIsPlaying(false);
            setProgressValue(0);
            setTimeSpanValue("00:00/00:00");
            setPercentage("0%");
        }
    }

    const volumnPlusButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === true) {
            let volume = player.volume;

            if (volume < 1) {
                player.volume = (volume + 0.1) > 1 ? 1 : volume + 0.1;
            }
        }
    }

    const volumnMinusButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === true) {
            let volume = player.volume;
            
            if (player.volume > 0) {
                player.volume = (volume - 0.1) < 0 ? 0 : volume - 0.1;
            }
        }
    }

    return (
        <div className="player">
            <div style={{ float: "left", paddingLeft: "20px" }}>
                <span id="timeElapsed">{timeSpanValue}</span>
            </div>
            <div style={{ float: "right", paddingRight: "20px" }}>
                <span id="percentage">{percentage}</span>
            </div>
            <br></br>
            <div className="buttonDiv">
                <Button
                    class={isPlaying ? 'button paused' : 'button'}
                    id="btnPlay"
                    alt="Play"
                    clicked={playButtonClickedEventHandler}>
                </Button>
                <ImageButton
                    buttonImage={StopButtonImage}
                    id="btnStop"
                    atl="Stop"
                    clicked={stopButtonClickedEventHandler}>
                </ImageButton>
                <ImageButton
                    buttonImage={VolumnButtonImage}
                    id="btnVolumn"
                    atl="Volumn">
                </ImageButton>
                <ImageButton
                    buttonImage={VolumnPlusButtonImage}
                    id="btnVolumn"
                    atl="Volumn"
                    clicked={volumnPlusButtonClickedEventHandler}>
                </ImageButton>
                <ImageButton
                    buttonImage={VolumnMinusButtonImage}
                    id="btnVolumn"
                    atl="Volumn"
                    clicked={volumnMinusButtonClickedEventHandler}>
                </ImageButton>
            </div>
            <br></br>
            <ProgressBar value={progressValue} clicked={progressBarClickedHandler}></ProgressBar>
            <br></br>
            <audio preload="none" id="player" src={track} controls>
            </audio>
        </div>
    );
}

export default Player;