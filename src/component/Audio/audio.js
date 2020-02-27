import React from 'react';
import Player from '../Player/player';
import '../Player/player.css';
import song from '../../assets/song/Static Memories.mp3'

const audio = (props) => (
        <div>
            <Player song={song} />
        </div>
);

export default audio;