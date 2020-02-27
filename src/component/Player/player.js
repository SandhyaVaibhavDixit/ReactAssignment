import React, { useState, useRef } from 'react';

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
    let player= useRef();

    //Declare initial state.
    const initialState = {
        isPlaying: false,
        timeSpanValue: "00:00 \\ 00:00",
        percentage: "0%",
        progressValue: 0,
        mute: false
    };

    const [state, setState] = useState(initialState);
    const updateState = data => setState(prevState => ({ ...prevState, ...data }));


    //const [player, setPlayer] = useState(null);

    //Initializa all constants.

    const { song } = props;

    // useEffect(() => {
    //     const Init = () => {
    //         setPlayer(document.getElementById('player'));
    //     };
    //     Init();
    // }, [initialState]);

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
        if (state.isPlaying === false) {
            player.play();
            updateState({ isPlaying: true });
            player.addEventListener('timeupdate', (event) => {
                const currentTime = Math.floor(event.target.currentTime);
                const duration = Math.floor(event.target.duration);
                updateState({ timeSpanValue: formatTime(currentTime) + " / " + formatTime(duration) });

                if (currentTime === duration) {
                    updateState({ isPlaying: false });
                }

                const percentage = ((currentTime * 100) / duration).toFixed(2);
                updateState({ percentage: percentage + "%" });
                updateState({ progressValue: percentage });
            }, false)
        }
        else {
            player.pause();
            updateState({ isPlaying: false });
        }
    };

    //Stop button click handler.
    const stopButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (state.isPlaying === true) {
            player.pause();
            player.currentTime = 0;
            updateState(initialState);
        }
    }

    //Increase volumn click handler.
    const volumnPlusButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (state.isPlaying === true) {
            let volume = player.volume;

            if (volume < 1) {
                player.volume = (volume + 0.1) > 1 ? 1 : volume + 0.1;
            }

            if (volume > 0) {
                updateState({ mute: false });
            }
        }
    }

    //Decrease volume click handler.
    const volumnMinusButtonClickedEventHandler = (event) => {
        event.preventDefault();

        if (state.isPlaying === true) {
            let volume = player.volume;

            if (player.volume > 0) {
                player.volume = (volume - 0.1) < 0 ? 0 : volume - 0.1;
            }
            else if (player.volume === 0) {
                updateState({ mute: true });
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
        var cursorPosition = event.pageX - event.currentTarget.offsetLeft;

        // Round %
        var percentage = Math.round(cursorPosition / progressbarWidth * 100);

        if (percentage > 100) {
            percentage = 100;
        }

        //Set player current time.
        player.currentTime = Math.floor((cursorPosition / progressbarWidth) * player.duration);

        //Set progress bar value.
        progress.value = percentage;
    }

    return (
        <div className="player">
            <div style={{ float: "left", paddingLeft: "25px" }}>
                <span style={{ fontWeight: "bold" }} id="timeElapsed">{state.timeSpanValue}</span>
            </div>
            <div style={{ float: "right", paddingRight: "25px" }}>
                <span style={{ fontWeight: "bold" }} id="percentage">{state.percentage}</span>
            </div>
            <br></br>
            <div className="buttonDiv">
                <Button
                    class={state.isPlaying ? 'button paused' : 'button'}
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
                    buttonImage={state.mute ? MuteButtonImage : VolumnButtonImage}
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
            <ProgressBar value={state.progressValue} clicked={progressBarClickHandler}></ProgressBar>
            <br></br>
            <audio ref={ref =>(player = ref)} preload="none" id="player" src={song}>
            </audio>
        </div>
    );
}

export default Player;