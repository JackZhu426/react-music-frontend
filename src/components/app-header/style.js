import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #4b4b4b;
  position: sticky;
  box-sizing: border-box;

  & .content {
    height: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    align-items: center;
  }

  & .divider {
    height: 5px;
    background-color: #D5C2F9;
  }

  & .logo {
    margin: 0px;
    width: 50px;
    height: 50px;
    line-height: 0px;
    background-image: url(${require('@/assets/img/favicon.png')});
    background-size: contain;
    background-repeat: no-repeat;
    /* 为了a标签里写内容 (SEO), 且不展示 */
    text-indent: -9999px;
  }
`;

export const HeaderNav = styled.div`
  box-sizing: border-box;
  height: 70px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  /* 即对 <NavLink> 做设置 */
  & a { 
    display: inline-block;
    box-sizing: border-box;
    height: 70px;
    line-height: 70px;
    /* word 刚好fit进a元素 (必须是inline-block) 的宽，而不是定义标准width */
    width: fit-content;
    text-align: center;
    font-size: 16px;
    color: #fff;
    transition: linear 0.3s;
    padding: 0 20px;
    position: relative;
  }

  & a:hover {
    background-color: #2f3640;
    text-decoration: none;
  }

  & .arrow {
    display: none;
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  & a.active .arrow {
    display: inline-block;
  }

  & a.active {
    background-color: #2f3640;
  }

  & a .hotTag {
    position: absolute;
    right: -3px;
    top: 8px;
    width: 22px;
    height: 22px;
  }
`;
