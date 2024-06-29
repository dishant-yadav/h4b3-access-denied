import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

const Uri = "";
const UserId = "";
const UlcaApiKey = "";
const AuthorizationToken = "";
const ROOM_ID = window.location.pathname.split('/')[2]; // Get room ID from URL
console.log("ROOM_ID", ROOM_ID);

const BACKEND = 'localhost:3050'

const Meeting = () => {

    const [myStream, setMyStream] = useState();
    const socketRef = useRef(null);
    const peerRef = useRef(null);
    const videoGridRef = useRef(null);
    const toggleCameraRef = useRef(null);
    const toggleSpeakingRef = useRef(null);
    const peers = {};


    function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        videoGridRef.current.append(video)
    }

    function connectToNewUser(userId, stream) {
        const call = peerRef.current.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
            video.remove()
        })

        peers[userId] = call
    }

    useEffect(() => {
        const socket = io(BACKEND);
        socketRef.current = socket;
        socket.on('connect', () => {
            console.log('Connected to server. socket id: ', socket.id);
        });

        const peer = new Peer();
        peerRef.current = peer;

        peer.on('open', id => {
            console.log('Peer ID: ', id);
            socket.emit('join-room', ROOM_ID, id)
        })

        const myVideo = document.createElement('video');
        myVideo.muted = true;

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setMyStream(stream);
                console.log("My Stream:", stream);
                addVideoStream(myVideo, stream);
                toggleCameraRef.current.innerText = 'Disable Camera';

                peer.on('call', call => {
                    call.answer(stream)
                    const video = document.createElement('video')
                    call.on('stream', userVideoStream => { addVideoStream(video, userVideoStream) }
                    )
                })

                socket.on('user-connected', userId => {
                    connectToNewUser(userId, stream)
                })
            });
        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        });

    }, []);

    function toggleCamera() {
        if (myStream) {
            myStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
                console.log(`Camera ${track.enabled ? 'enabled' : 'disabled'}`);
                console.log("toggleCameraRef", toggleCameraRef.current.innerText);
                toggleCameraRef.current.innerText = track.enabled ? 'Disable Camera' : 'Enable Camera';
            });
        }
    }

    function toggleSpeaking() {
        console.log("toggle speaking triggered");
    }

    return (
        <>
            <div id="video-grid" style={videoGridStyle} ref={videoGridRef}></div>
            <div className="controls" style={controlsStyle}>
                <label htmlFor="language">I am fluent in:</label>
                <select id="language" name="language" style={selectStyle}>
                    <option value="hi-IN">Hindi</option>
                    <option value="en-IN">English</option>
                    <option value="Bangla India Male">Bengali</option>
                </select>
                <button id="toggle-camera" style={buttonStyle} onClick={toggleCamera} ref={toggleCameraRef}></button>
                <button id="toggle-listening" style={buttonStyle} onClick={toggleSpeaking} ref={toggleSpeakingRef}>Start Speaking</button>
            </div>
            <div style={{ textAlign: 'center' }}>Press on stop speaking before changing language.</div>
        </>
    );
};

const videoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
    gridAutoRows: '300px'
};

const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const controlsStyle = {
    marginTop: '10px',
    textAlign: 'center'
};

const buttonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px'
};

const selectStyle = {
    padding: '8px',
    fontSize: '16px'
};

export default Meeting