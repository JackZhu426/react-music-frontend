import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  padding: 0 10px 4px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .left-icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      background-image: url(${require('@/assets/img/cd-disk.png')});
      background-size: contain;
    }

    .title {
      font-size: 20px;
      margin-right: 15px;
    }

    .keyword {
      display: flex;

      .item {
        .divider {
          margin: 0 10px;
          color: #ccc;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background-image: url(${require('@/assets/img/forward.png')});
      background-size: contain;
    }
  }
`;
