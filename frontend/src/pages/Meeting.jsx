import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

import translateApi from "../api/Translate";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND = "localhost:3050";

const Meeting = () => {
  const user = localStorage.getItem("user");
  const { roomId } = useParams();
  const ROOM_ID = roomId;
  console.log("Room Id", ROOM_ID);
  const [conversation, setConversation] = useState([]);
  const [myStream, setMyStream] = useState();
  const [cameraBackgroundColor, setCameraBackgroundColor] = useState("red");
  const [speakingBackgroundColor, setSpeakingBackgroundColor] =
    useState("green");
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const videoGridRef = useRef(null);
  const toggleCameraRef = useRef(null);
  const toggleSpeakingRef = useRef(null);
  const selectLanguageRef = useRef(null);
  const [callActive, setCallActive] = useState(false);
  const endCallRef = useRef(null);
  const navigate = useNavigate();

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
    const script = document.createElement("script");
    script.src =
      "https://code.responsivevoice.org/responsivevoice.js?key=RSW3kofy";
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
    socket.on("connect", () => {
      console.log("Connected to server. socket id: ", socket.id);
    });

    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      console.log("Peer ID: ", id);
      socket.emit("join-room", ROOM_ID, id);
    });

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
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
      setCallActive(true);
    });
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });

    return () => {
      peer.disconnect();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on("message:receive", async (message) => {
      console.log("RECIEVED: before translation: ", message);
      console.log("To translate to: ", getSpeechLanguage());
      let translated = "";
      setConversation((prev) => [
        ...prev,
        { role: "Patient", content: message },
      ]);
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

      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      // recognition.interimResults = true; ---> keep it off else you will face multiple same result issue

      recognition.onstart = function () {
        recognizing = true;
        console.log("Speech recognition started");
      };

      recognition.onend = function () {
        recognizing = false;
        console.log("Speech recognition stopped");
        console.log("total spoken: ", totalResult);
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
            setConversation((prev) => [
              ...prev,
              { role: "Doctor", content: res },
            ]);
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
            setConversation((prev) => [
              ...prev,
              { role: "Doctor", content: res },
            ]);
            socketRef.current.emit("message:send", ROOM_ID, res);
          });
        } else {
          setConversation((prev) => [
            ...prev,
            { role: "Doctor", content: current_result },
          ]);
          socketRef.current.emit("message:send", ROOM_ID, current_result);
        }
      };

      // recognition.onend = function () {
      //   recognizing = false;
      //   console.log("Speech recognition stopped");
      //   console.log("total spoken: ", totalResult);
      // };

      // eslint-disable-next-line no-inner-declarations
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
  }, []);

  function endCall() {
    // Clean up streams, peers, and socket connections
    console.log("conversation", conversation);
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    Object.keys(peers).forEach((peerId) => {
      peers[peerId].close();
    });
    peerRef.current.destroy();
    socketRef.current.disconnect();
    setCallActive(false);
    // navigate("/appointments")
    const prescId =  localStorage.getItem("id");
    if (user === "Doctor" && prescId) {
      navigate(`/prescription/${prescId}`, {
        state: {
          conversation,
        },
      });
    } else {
      navigate("/appointments");
    }
  }

  return (
    <div className="px-8 py-6 h-screen bg-blue-200">
      <div
        id="video-grid"
        style={videoGridStyle}
        ref={videoGridRef}
        className="bg-black/90 rounded-2xl shadow-md py-8"
      ></div>
      <div
        className="controls flex justify-between py-4 px-6"
        style={controlsStyle}
      >
        <div>
          <label htmlFor="language" className="text-xl font-semibold">
            Choose your fluent language:
          </label>
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
          {callActive && (
            <button
              id="end-call"
              onClick={endCall}
              ref={endCallRef}
              style={buttonStyle}
              className="rounded-lg text-white font-semibold shadow-md w-40 bg-red-600"
            >
              End Call
            </button>
          )}
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
