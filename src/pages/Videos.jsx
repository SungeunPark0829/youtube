import React, { use } from 'react'
import { useParams } from 'react-router-dom';
import VideoBox from '../components/VideoBox';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
    const {query} = useParams();
    // const youtube = new YoutubeDev();
    const {youtube} = useYoutubeApi();


    const {isLoading, error, data : videoList} = useQuery({ 
        queryKey : ['videos', query], 
        queryFn : () => youtube.search(query),
        staleTime : 1 * 60 * 1000,
    });

    return (
    <>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {videoList && (
    
        <ul style={{ display: 'grid' }} 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
            {videoList.map((video) => (
                <VideoBox key={video.id} video={video} />
            ))}
        </ul>
    )}
    </>
  )
}
