import React, { memo } from 'react';
// utils
import { Routes, Route, Link, Navigate } from 'react-router-dom';

// components
import JZAppHeader from '@/components/app-header';
import JZAppFooter from '@/components/app-footer';
import JZDiscover from '@/pages/discover';
import JZMy from '@/pages/my';
import JZSubscription from '@/pages/subscription';
import JZRecommendation from './pages/discover/discover-pages/recommendation';
import JZBillboard from './pages/discover/discover-pages/billboard';
import JZList from '@/pages/discover/discover-pages/list';
import JZPodcast from '@/pages/discover/discover-pages/podcast';
import JZArtist from '@/pages/discover/discover-pages/artist';
import JZAppPlayerBar from '@/pages/player/app-player-bar';
import store from './store';
import { Provider } from 'react-redux';

const App = memo(() => {
  return (
    <Provider store={store}>
      <JZAppHeader />
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
        </Route>
        <Route path="/my" element={<JZMy />}></Route>
        <Route path="/subscription" element={<JZSubscription />}></Route>
      </Routes>
      <JZAppPlayerBar />
      {/* <JZAppFooter /> */}
    </Provider>
  );
});

export default App;
