import styled from 'styled-components';

export const TopRankingWrapper = styled.div`
  flex: 1;

  .header {
    height: 100px;
    display: flex;

    margin: 20px 0 0 20px;

    .image {
      width: 80px;
      height: 80px;
      position: relative;

      img {
        width: 80px;
        height: 80px;
      }
    }

    .info {
      margin: 5px 0 0 10px;

      a {
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }

      .btn {
        display: inline-block;
        text-indent: -9999px;
        width: 22px;
        height: 22px;
        margin: 8px 10px 0 0;
        cursor: pointer;
      }

      .play {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(${require('@/assets/img/play-grey.png')});
      }

      .favor {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(${require('@/assets/img/favorite-grey.png')});
      }
    }
  }

  .list {
    .list-item {
      position: relative;
      display: flex;
      align-items: center;
      height: 32px;

      &:nth-child(-n + 3) .rank {
        color: #c10d0c;
      }

      .rank {
        width: 35px;
        text-align: center;
        margin-left: 10px;
        font-size: 16px;
      }

      .info {
        color: #000;
        width: 170px;
        height: 17px;
        line-height: 17px;
        display: flex;
        justify-content: space-between;

        .name {
          /* f you set it with a single number value, like flex: 5;
          that changes the flex-basis to 0% ; 默认: flex: 0 1 auto
          NOW: flex-grow: 1; flex-shrink: 0; flex-basis: 0%
          即：设置了值, basis就变为0，通过flex-grow(自由地)去设置宽度
          */
          flex: 1;
        }

        .operate {
          align-items: center;
          display: none;
          width: 82px;

          .btn {
            width: 17px;
            height: 17px;
            margin-left: 8px;
            cursor: pointer;
            /* 统一设置background属性 */
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-color: transparent;
          }

          .play {
            background-image: url(${require('@/assets/img/play-grey.png')});
          }

          .addto {
            background-image: url(${require('@/assets/img/addto.png')});
          }

          .favor {
            background-image: url(${require('@/assets/img/favorite-grey.png')});
          }
        }
      }

      &:hover {
        .operate {
          display: flex;
        }
      }
    }
  }

  .footer {
    height: 32px;
    display: flex;
    align-items: center;
    margin-right: 32px;
    justify-content: flex-end;

    a {
      color: #000;
    }
  }
`;
