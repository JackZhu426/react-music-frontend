import React, { memo, lazy, Suspense } from 'react';
// utils
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

// components
import JZAppHeader from '@/components/app-header';
import JZAppFooter from '@/components/app-footer';
import JZAppPlayerBar from '@/pages/player/app-player-bar';

// components, 用lazy loading (懒加载)
const JZDiscover = lazy(() => import('@/pages/discover'));
const JZMy = lazy(() => import('@/pages/my'));
const JZSubscription = lazy(() => import('@/pages/subscription'));
const JZRecommendation = lazy(() =>
  import('./pages/discover/discover-pages/recommendation')
);
const JZBillboard = lazy(() =>
  import('./pages/discover/discover-pages/billboard')
);
const JZList = lazy(() => import('@/pages/discover/discover-pages/list'));
const JZPodcast = lazy(() => import('@/pages/discover/discover-pages/podcast'));
const JZArtist = lazy(() => import('@/pages/discover/discover-pages/artist'));
const JZPlayer = lazy(() => import('@/pages/player'));

const App = memo(() => {
  return (
    <Provider store={store}>
      <JZAppHeader />
      {/* Routes里：懒加载需要的 'Suspense' (悬念), 及属性 fallback={组件} */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* 重定向 - 用 <Navigate to="..."> */}
          <Route path="/" element={<Navigate to="/discover" />} />
          {/* 发现, default landing page - using '/' */}
          <Route path="/discover" element={<JZDiscover />}>
            <Route path="" element={<JZRecommendation />} />
            <Route path="billboard" element={<JZBillboard />} />
            <Route path="list" element={<JZList />} />
            <Route path="podcast" element={<JZPodcast />} />
            <Route path="artist" element={<JZArtist />} />
            <Route path="player" element={<JZPlayer />} />
          </Route>
          <Route path="/my" element={<JZMy />}></Route>
          <Route path="/subscription" element={<JZSubscription />}></Route>
        </Routes>
      </Suspense>
      <JZAppPlayerBar />
      {/* <JZAppFooter /> */}
    </Provider>
  );
});

export default App;
