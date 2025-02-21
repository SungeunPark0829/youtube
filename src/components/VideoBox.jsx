import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/data";

export default function VideoBox({video, type}) {
    const navigate = useNavigate();
    const {title, channelTitle, thumbnails, publishedAt} = video.snippet;
    const isList = type === 'list';
    
  function handleClick() {
    console.log('Video data:', video);
    navigate(`/videos/watch/${video.id}`, {state: {video}});
  }
  return (
    <li 
    className={isList ? 'flex gap-1 m-2' : ''}
    onClick={handleClick}>
      <img 
      className={isList ? 'w-p-100 h-40 mr-2' : 'w-p-100 h-40 object-cover'}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
