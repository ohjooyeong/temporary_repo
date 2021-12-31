import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import "./VideoCard.css";

function VideoCard({ videoUrl, title }) {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);
  const handleMouseEnter = () => {
    videoRef.current.player.seekTo(1);

    setPlay(true);
  };
  const handleMouseLeave = () => {
    videoRef.current.player.seekTo(1);
    setPlay(false);
  };

  return (
    <li
      className="video-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-preview">
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          playing={play}
          muted={true}
          ref={videoRef}
          config={{ file: { forceHLS: true } }}
          url={videoUrl}
        />
      </div>
      <div className="item-info">
        <h3 className="item-title">{title ? title : "No Title"}</h3>
        <div className="item-genre">
          <span></span>
        </div>
        {play ? <button className="item-confirm">확인 하기</button> : ""}
      </div>
    </li>
  );
}

export default VideoCard;
