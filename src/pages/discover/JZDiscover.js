import React, { memo } from 'react';
import { DiscoverWrapper, TopMenu } from './style';
import { NavLink, Outlet } from 'react-router-dom';

const JZDiscover = memo(() => {
  return (
    <>
      <DiscoverWrapper>
        <TopMenu className="wrap-v1">
          <div className="item">
            <NavLink to="/discover" end>
              Recommendation
            </NavLink>
          </div>
          <div className="item">
            {/* 这里用绝对路径，因为当前路径是/discover的element, 所以用相对路径 - billboard 也是可以的 */}
            <NavLink to="/discover/billboard">Billboard</NavLink>
          </div>
          <div className="item">
            <NavLink to="list">Top List</NavLink>
          </div>
          <div className="item">
            <NavLink to="/discover/podcast">Podcast</NavLink>
          </div>
          <div className="item">
            <NavLink to="/discover/artist">Artist</NavLink>
          </div>
        </TopMenu>
      </DiscoverWrapper>
      <Outlet />
    </>
  );
});

export default JZDiscover;
