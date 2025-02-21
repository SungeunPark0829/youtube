import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Root />,
      errorElement : <NotFound/>,
      children : [
        {
          index : true,
          element : <Videos />
        },
        {
          path : '/videos',
          element : <Videos />,
        },
        {
          path : '/videos/:query',
          element : <Videos />,
        },
        {
          path : '/videos/watch/:videoId',
          element : <VideoDetail />,
        }
      ]
    },
    
  ]);
  return (
    <RouterProvider router= {router}/>
  );
}

export default App
