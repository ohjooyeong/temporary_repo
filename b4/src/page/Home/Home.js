import React, { useEffect, useState } from "react";
import "./Home.css";
import VideoCard from "../../components/VideoCard/VideoCard.js";

function Home() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/data/data.json");
        const data = await response.json();

        setVideo(data.video_list);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const renderList = () => {
    if (Video.length > 0) {
      return Video.map((video, i) => (
        <VideoCard key={i} videoUrl={video.url} title={video.title}></VideoCard>
      ));
    }
    return [];
  };

  return (
    <>
      <section className="home-container">
        <div className="home-header">
          <div className="home-title">
            <h2>비디오 리스트</h2>
          </div>
          <div></div>
        </div>
        <ul className="list-item">{renderList()}</ul>
      </section>
    </>
  );
}

export default Home;
