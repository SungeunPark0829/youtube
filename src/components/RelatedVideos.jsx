import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoBox from './VideoBox';

export default function RelatedVideos({id}) {

    const {youtube} = useYoutubeApi();
    const {isLoading, error, data : videos} = useQuery({
        queryKey : ['videos', null],
        queryFn : () => youtube.search(null),
        staleTime: 5 * 60 * 1000,
    });
  return (
    <>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {videos && (
    
        <ul>
            {videos.map((video) => (
                <VideoBox key={video.id} video={video} type='list' />
            ))}
        </ul>
    )}
    </>
  )
}
