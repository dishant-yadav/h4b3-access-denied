<<<<<<< Updated upstream
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

import translateApi from '../api/Translate';

const ROOM_ID = window.location.pathname.split('/')[2]; // Get room ID from URL
=======
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import translateApi from "../api/Translate";
const ROOM_ID = window.location.pathname.split("/")[2]; // Get room ID from URL
>>>>>>> Stashed changes
console.log("ROOM_ID", ROOM_ID);

const BACKEND = "localhost:3050";

const Meeting = () => {
  const [myStream, setMyStream] = useState();
  const [cameraBackgroundColor, setCameraBackgroundColor] = useState("red");
  const [speakingBackgroundColor, setSpeakingBackgroundColor] = useState("green");
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const videoGridRef = useRef(null);
  const toggleCameraRef = useRef(null);
  const toggleSpeakingRef = useRef(null);
  const selectLanguageRef = useRef(null);

  // const [recognizing, setRecognizing] = useState(false);
  let recognizing = false;
  const [totalResult, setTotalResult] = useState("");

  const peers = {};

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGridRef.current.append(video);
  }

  function connectToNewUser(userId, stream) {
    const call = peerRef.current.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });

    peers[userId] = call;
  }

  function toggleCamera() {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
        console.log(`Camera ${track.enabled ? "enabled" : "disabled"}`);
        toggleCameraRef.current.innerText = track.enabled
          ? "Disable Camera"
          : "Enable Camera";
        setCameraBackgroundColor(track.enabled ? "red" : "blue");
      });
    }
  }

  function getSpeechLanguage() {
    return selectLanguageRef.current.value;
  }

  useEffect(() => {
    const socket = io(BACKEND);
    socketRef.current = socket;
    console.log("Selected language: ", getSpeechLanguage());
    socket.on("connect", () => {
      console.log("Connected to server. socket id: ", socket.id);
    });

    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      console.log("Peer ID: ", id);
      socket.emit("join-room", ROOM_ID, id);
    });

<<<<<<< Updated upstream
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=RSW3kofy';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const socket = io(BACKEND);
        socketRef.current = socket;
        console.log("Selected language: ", getSpeechLanguage());
        socket.on('connect', () => {
            console.log('Connected to server. socket id: ', socket.id);
=======
    const myVideo = document.createElement("video");
    myVideo.muted = true;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setMyStream(stream);
      console.log("My Stream:", stream);
      addVideoStream(myVideo, stream);
      toggleCameraRef.current.innerText = "Disable Camera";
      setCameraBackgroundColor("red");

      peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
>>>>>>> Stashed changes
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
    });
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });
  }, []);

  useEffect(() => {
    socketRef.current.on("message:receive", async (message) => {
      console.log("RECIEVED: before translation: ", message);
      console.log("To translate to: ", getSpeechLanguage());
      let translated = "";
      if (getSpeechLanguage() === "en-IN") {
        translated = message;
      } else if (getSpeechLanguage() === "Bangla India Male") {
        translated = await translateApi(message, "en", "bn");
      } else
        translated = await translateApi(
          message,
          "en",
          getSpeechLanguage()[0] + "" + getSpeechLanguage()[1]
        );
      console.log("RECIEVED: after translation: ", translated);
      utterance.lang = getSpeechLanguage();
      utterance.text = translated;
      if (getSpeechLanguage() === "Bangla India Male") {
        responsiveVoice.speak(translated, getSpeechLanguage());
        return;
      }

      synth.speak(utterance);
    });

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();

    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Speech recognition not supported. Please use Google Chrome version 25 or later."
      );
    } else {
      toggleSpeakingRef.current.innerText = "Start Speaking";
      setSpeakingBackgroundColor("green");

<<<<<<< Updated upstream
                socket.on('user-connected', userId => {
                    connectToNewUser(userId, stream)
                })
            });
        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        });
    }, []);
=======
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      // recognition.interimResults = true; ---> keep it off else you will face multiple same result issue
>>>>>>> Stashed changes

      recognition.onstart = function () {
        recognizing = true;
        console.log("Speech recognition started");
      };

      recognition.onend = function () {
        recognizing = false;
        console.log("Speech recognition stopped");
      };

      recognition.onresult = async function (event) {
        if (typeof event.results == "undefined") {
          recognition.onend = null;
          recognition.stop();
          return;
        }
        let current_result =
          event.results[event.results.length - 1][0].transcript;
        console.log("current result: ", current_result);
        if (getSpeechLanguage() === "Bangla India Male") {
          translateApi(current_result, "bn", "en").then((res) => {
            setTotalResult((prev) => prev + res + "\n");
            socketRef.current.emit("message:send", ROOM_ID, res);
          });
        }
        if (getSpeechLanguage() !== "en-IN") {
          translateApi(
            current_result,
            getSpeechLanguage()[0] + "" + getSpeechLanguage()[1],
            "en"
          ).then((res) => {
            setTotalResult((prev) => prev + res + "\n");
            socketRef.current.emit("message:send", ROOM_ID, res);
          });
        } else {
          socketRef.current.emit("message:send", ROOM_ID, current_result);
        }
      };

      recognition.onend = function () {
        recognizing = false;
        console.log("Speech recognition stopped");
        console.log("total spoken: ", totalResult);
      };

      function toggleSpeaking() {
        if (recognizing) {
          recognition.stop();
          toggleSpeakingRef.current.innerText = "Start Speaking";
          setSpeakingBackgroundColor("green");
        } else {
          recognition.start();
          toggleSpeakingRef.current.innerText = "Stop Speaking";
          setSpeakingBackgroundColor("red");
        }
        console.log("toggle speaking triggered");
      }

      selectLanguageRef.current.addEventListener("change", () => {
        console.log("Selected Value", getSpeechLanguage());
        if (recognizing) {
          recognition.stop();
          toggleSpeakingRef.current.innerText = "Start Speaking";
          setSpeakingBackgroundColor("green");
        }
      });

      toggleSpeakingRef.current.addEventListener("click", toggleSpeaking);
    }
  }, []);

  useEffect(() => {
    toggleCameraRef.current.innerText = "Disable Camera";
  }, [])

  return (
    <div className="px-8 py-6 h-screen bg-blue-200">
      <div
        id="video-grid"
        style={videoGridStyle}
        ref={videoGridRef}
        className="bg-black/90 rounded-2xl shadow-md py-8"
      ></div>
      <div className="controls flex justify-between py-4 px-6" style={controlsStyle}>
        <div>
          <label htmlFor="language" className="text-xl font-semibold">Choose your fluent language:</label>
          <select
            id="language"
            name="language"
            style={selectStyle}
            ref={selectLanguageRef}
            className="text-lg font-medium rounded-md ml-2 bg-white shadow-lg"
          >
            <option value="hi-IN">Hindi</option>
            <option value="en-IN">English</option>
            <option value="Bangla India Male">Bengali</option>
          </select>
        </div>
        <div>
          <button
            id="toggle-camera"
            style={{ ...buttonStyle, backgroundColor: cameraBackgroundColor }}
            onClick={toggleCamera}
            ref={toggleCameraRef}
            className="rounded-lg text-white font-semibold shadow-md w-40"
          ></button>
          <button
            id="toggle-listening"
            style={{ ...buttonStyle, backgroundColor: speakingBackgroundColor }}
            ref={toggleSpeakingRef}
            className="rounded-lg text-white font-semibold shadow-md w-40"
          ></button>
        </div>
      </div>
    </div>
  );
};

const videoGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridAutoRows: "500px",
  gap: "40px",
  alignItems: "center",
  justifyContent: "center",
  padding: "50px",
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const controlsStyle = {
  marginTop: "10px",
  textAlign: "center",
};

const buttonStyle = {
  margin: "0 10px",
  padding: "10px 20px",
  fontSize: "16px",
};

const selectStyle = {
  padding: "8px",
  fontSize: "16px",
};

export default Meeting;
