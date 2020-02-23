import React from 'react';
import Player from '../Player/player';
import '../Player/player.css';
import song from '../../assets/song/Static Memories.mp3'

function audio(props) {
    return (
        <div>
            <Player song={song} />
        </div>
    );
}

export default audio;