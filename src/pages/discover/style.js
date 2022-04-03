import styled from 'styled-components';

export const DiscoverWrapper = styled.div`
  height: 30px;
  background-color: #d5c2f9;
`;

export const TopMenu = styled.div`
  display: flex;
  padding-left: 65px;
  position: relative;
  top: -4px;

  .item {
    a {
      display: inline-block;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      padding: 0 13px;
      margin: 7px 10px 0;
      color: #fff;
      transition: 0.5s linear;

      &:hover,
      &.active {
        text-decoration: none;
        background-color: #7833f7;
        border-radius: 20px;
      }
    }
  }
`;
