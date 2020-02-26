import React, { useState, useEffect, useCallback } from 'react';

import './player.css';

import Button from '../UI/Button/Button';
import ImageButton from '../UI/Button/ImageButton';
import ProgressBar from '../UI/Progressbar/Progressbar';

import StopButtonImage from '../../assets/images/stop.png';
import VolumnButtonImage from '../../assets/images/volumn.png';
import VolumnPlusButtonImage from '../../assets/images/plus.png';
import VolumnMinusButtonImage from '../../assets/images/minus.png';
import MuteButtonImage from '../../assets/images/mute.png';

const Player = props => {

    const [track, setTrack] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [playButtonImageId, setPlayButtonImageId] = useState(null);
    const [timeSpanValue, setTimeSpanValue] = useState("00:00 \\ 00:00");
    const [percentage, setPercentage] = useState("0%");
    const [progressValue, setProgressValue] = useState(0);
    const [mute, setMute] = useState(false);

    //Initializa all constants.
    const Init = () => {
        setTrack(props.song);
        setPlayer(document.getElementById('player'));
        // setPlayButtonImageId(document.getElementById('imgPlay'));
    };

    useEffect(() => {
        Init()
    }, [Init]);

    //Format time from seconds => mm:ss
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
                setTimeSpanValue(formatTime(currentTime) + " / " + formatTime(duration));

                if(currentTime === duration){
                    setIsPlaying(false);
                }

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

    //Stop button click handler.
    const stopButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === true) {
            player.pause();
            player.currentTime = 0;
            setIsPlaying(false);
            setProgressValue(0);
            setTimeSpanValue("00:00 \\ 00:00");
            setPercentage("0%");
        }
    }

    //Increase volumn click handler.
    const volumnPlusButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === true) {
            let volume = player.volume;

            if (volume < 1) {
                player.volume = (volume + 0.1) > 1 ? 1 : volume + 0.1;
            }

            if (volume > 0) {
                setMute(false);
            }
        }
    }

    //Decrease volume click handler.
    const volumnMinusButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (isPlaying === true) {
            let volume = player.volume;

            if (player.volume > 0) {
                player.volume = (volume - 0.1) < 0 ? 0 : volume - 0.1;
            }
            else if (player.volume === 0) {
                setMute(true);
            }
        }
    }

    //Progress bar clicked handler
    const progressBarClickHandler = (event) => {
        //event.preventDefault();
        var progress = document.getElementById('seekProgress');

        //Get width element
        var progressbarWidth = event.currentTarget.offsetWidth;
        //Ger Position cursor
        var sursorPosition = event.pageX - event.currentTarget.offsetLeft;

        // Round %
        var percentage = Math.round(sursorPosition / progressbarWidth * 100);

        if (percentage > 100) {
            percentage = 100;
        }

        //Set player current time.
        player.currentTime = (sursorPosition / progressbarWidth) * player.duration;

        //Set progress bar value.
        progress.value = percentage;
    }

    return (
        <div className="player">
            <div style={{ float: "left", paddingLeft: "25px" }}>
                <span style={{fontWeight: "bold"}} id="timeElapsed">{timeSpanValue}</span>
            </div>
            <div style={{ float: "right", paddingRight: "25px" }}>
                <span style={{fontWeight: "bold"}} id="percentage">{percentage}</span>
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
                    buttonImage={mute ? MuteButtonImage : VolumnButtonImage}
                    id="btnVolumn"
                    atl="Volumn">
                </ImageButton>
                <ImageButton
                    buttonImage={VolumnPlusButtonImage}
                    id="btnVolumnPlus"
                    atl="Volumn"
                    clicked={volumnPlusButtonClickedEventHandler}>
                </ImageButton>
                <ImageButton
                    buttonImage={VolumnMinusButtonImage}
                    id="btnVolumnMinus"
                    atl="Volumn"
                    clicked={volumnMinusButtonClickedEventHandler}>
                </ImageButton>
            </div>
            <ProgressBar value={progressValue} clicked={progressBarClickHandler}></ProgressBar>
            <br></br>
            <audio preload="none" id="player" src={track}>
            </audio>
        </div>
    );
}

export default Player;