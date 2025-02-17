"use client";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import React, { FC, useState } from "react";

import "./styles.css";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

export const Basics: FC = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState("");
  const [channel, setChannel] = useState("");
  const [token, setToken] = useState("");

  useJoin(
    { appid: appId, channel: channel, token: token ? token : null },
    calling
  );
  //local user
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  //remote users
  let remoteUsers = useRemoteUsers();

  function leaveCall() {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.stop();
      localMicrophoneTrack.close();
    }
    if (localCameraTrack) {
      localCameraTrack.stop();
      localCameraTrack.close();
    }
    remoteUsers = [];
  }

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="local-user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="remote-user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                  playAudio={user.hasAudio}
                  playVideo={user.hasVideo}
                  volume={100}
                  playbackDeviceId={user.uid.toString()}
                >
                  <samp className="user-name">
                    {JSON.stringify(user.videoTrack)}
                  </samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="175"
              height="61"
              viewBox="0 0 175 61"
            >
              <g>
                <path
                  d="M98,28.19a9.85,9.85,0,1,1,9.84-9.85A9.86,9.86,0,0,1,98,28.19M98,.48a17.86,17.86,0,1,0,17.86,17.86A17.89,17.89,0,0,0,98,.48"
                  fill="#099dfd"
                />
                <path
                  d="M127.67,5.08l-.22.22-.24.23-.16-.29L126.91,5a8.53,8.53,0,0,0-6.34-4.4L119.9.47V36.21l.67-.09a8.3,8.3,0,0,0,7.35-8.41V18.34a9.93,9.93,0,0,1,8.83-9.79l.53-.06v-8l-.64.07a15.21,15.21,0,0,0-9,4.54"
                  fill="#099dfd"
                />
                <path
                  d="M17.86,28.2a9.85,9.85,0,1,1,9.85-9.85,9.86,9.86,0,0,1-9.85,9.85M29.33,4l-.15.2-.15.2-.2-.15-.19-.15A17.86,17.86,0,1,0,17.86,36.21a17.67,17.67,0,0,0,10.78-3.63l.19-.14.2-.16.15.21.15.2a8.52,8.52,0,0,0,5.73,3.44l.66.09V.48l-.66.09A8.53,8.53,0,0,0,29.33,4"
                  fill="#099dfd"
                />
                <path
                  d="M157.14,28.2A9.85,9.85,0,1,1,167,18.35a9.86,9.86,0,0,1-9.85,9.85M174.34.57A8.57,8.57,0,0,0,168.6,4l-.14.19-.15.21-.2-.15-.19-.15a17.86,17.86,0,1,0-10.78,32.09,17.67,17.67,0,0,0,10.78-3.63l.19-.14.2-.16.15.21.14.2a8.56,8.56,0,0,0,5.74,3.44l.66.09V.48Z"
                  fill="#099dfd"
                />
                <path
                  d="M58.18,8.49h0a9.85,9.85,0,1,1-9.86,9.85A9.86,9.86,0,0,1,58.2,8.49M69.35,32.27A17.82,17.82,0,0,0,73,8.33c-.25-.38-.53-.75-.82-1.11A8.66,8.66,0,0,0,76,1.15l.1-.67H58.11A17.85,17.85,0,0,0,47,32.27a17.81,17.81,0,0,0-2.14,2l5.44,6a9.85,9.85,0,1,1,13,14.3l5.45,6a17.84,17.84,0,0,0,.51-28.26"
                  fill="#099dfd"
                />
              </g>
            </svg>
            <input
              onChange={(e) => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={(e) => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={(e) => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            />

            <button
              className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button
              className={`btn ${!micOn ? "disabled" : ""}`}
              onClick={() => setMic((a) => !a)}
            >
              {micOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}
            </button>
            <button
              className={`btn ${!cameraOn ? "disabled" : ""}`}
              onClick={() => setCamera((a) => !a)}
            >
              {cameraOn ? <FiCamera /> : <FiCameraOff />}
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
            onClick={() => {
              setCalling((a) => !a);
              leaveCall();
            }}
          >
            {calling ? <ImPhoneHangUp /> : <ImPhoneHangUp />}
          </button>
        </div>
      )}
    </>
  );
};

export default Basics;
