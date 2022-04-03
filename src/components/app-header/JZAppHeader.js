import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderWrapper, HeaderNav } from './style';
import { ThemeProvider } from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// img:
import musicLogo from '@/assets/img/favicon.png';
import arrowUp from '@/assets/img/castle.png';
import hotTag from '@/assets/img/hot.png';
const JZAppHeader = memo(() => {
  // 业务代码

  // 返回jsx
  return (
    <ThemeProvider theme={{ rightPadding: '5px' }}>
      <HeaderWrapper>
        <div className="content wrap-v1">
          <HeaderNav>
            <NavLink to="/">
              <img src={musicLogo} alt="logo" className="logo" />
            </NavLink>

            <NavLink to="discover">
              Discover
              <img src={arrowUp} alt="arrowup" className="arrow" />
            </NavLink>

            <NavLink to="my">
              Favorite
              <img src={arrowUp} alt="arrowup" className="arrow" />
            </NavLink>

            <NavLink to="subscription">
              Subscription
              <img src={arrowUp} alt="arrowup" className="arrow" />
            </NavLink>

            <NavLink to="store" target="_blank">
              Store
              <img src={arrowUp} alt="arrowup" className="arrow" />
            </NavLink>

            <NavLink to="musician" target="_blank">
              Musician
              <img src={arrowUp} alt="arrowup" className="arrow" />
            </NavLink>

            <NavLink to="download" target="_blank">
              Download
              <img src={arrowUp} alt="arrow up" className="arrow" />
              <img src={hotTag} alt="hot tag" className="hotTag" />
            </NavLink>
          </HeaderNav>
          <HeaderNav>
            <Input
              placeholder="Search Music..."
              prefix={<SearchOutlined />}
              style={{
                width: '150px',
                height: '35px',
                borderRadius: '15px',
                transition: '0.2s linear',
              }}
              className="searchMusic"
            />
            <NavLink to="login" target="_blank">
              Login
            </NavLink>
          </HeaderNav>
        </div>
        <div className="divider"></div>
      </HeaderWrapper>
    </ThemeProvider>
  );
});

export default JZAppHeader;
