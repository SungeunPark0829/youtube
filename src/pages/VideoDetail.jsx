import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();
  const {title, channelTitle, channelId, publishedAt, description} = video.snippet;
  // const [ video, setVideo ] = useState(location.state?.video || localStorage.getItem('video'));

  useEffect(() => {
    if (video) {
      localStorage.setItem("video", JSON.stringify(video));
    }
  }, [video]);

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`https://www.youtube.com/embed/${video.id}`}
          style={{ border: "none" }}
          title={title}
        ></iframe>
        <div className='p-8'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <pre className='whitespace-pre-wrap'>{description}</pre>
        </div>
      </article>
      <section className='basis-2/6'>
        <RelatedVideos id={video.id} />
      </section> 
    </section>
  );
}
