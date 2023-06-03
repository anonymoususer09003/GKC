import { useEffect, useRef } from "react";
import { JaaSMeeting } from "@jitsi/react-sdk";
const JitsiMeetComponent = ({ user, roomName }) => {
  return (
    <main className="container-fluid jitsi-container ">
      <div
        className="p-5 container jitsi-container "
        style={{ minHeight: "90vh" }}
      >
        <div
          className="jitsi-container  shadow bg-white rounded "
          style={{ minHeight: "500px" }}
        >
          <JaaSMeeting
            roomName={roomName}
            configOverwrite={{
              prejoinPageEnabled: false,
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false,
              SHOW_BRAND_WATERMARK: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
              SHOW_BRAND_WATERMARK: false,
            }}
            userInfo={{
              displayName: user?.name,
            }}
            onApiReady={(externalApi) => {
              // here you can attach custom event listeners to the Jitsi Meet External API
              // you can also store it locally to execute commands
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "500px";
            }}
            style={{ height: "100%" }}
          />
          <style jsx>{`
            .jitsi-container .watermark {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </main>
  );
};

export default JitsiMeetComponent;
