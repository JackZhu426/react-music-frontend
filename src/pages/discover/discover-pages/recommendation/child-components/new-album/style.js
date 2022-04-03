import styled from 'styled-components';

export const AlbumWrapper = styled.div`
  margin-top: 50px;

  .content {
    height: 186px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    margin: 20px 0 37px;
    display: flex;
    align-items: center;
    position: relative;
    
    .album {
      width: 640px;
      height: 150px;
      margin: 0 auto;

      .ant-carousel .slick-slide {
        height: 150px;
        overflow: hidden;
      }

      .page {
        display: flex !important;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        text-align: center;
      }
    }
  }
`;

export const LeftArrow = styled.button`
  background-color: transparent;
  position: absolute;
  background-image: url(${require('@/assets/img/left.png')});
  background-size: contain;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 1px;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 999;
`;

export const RightArrow = styled(LeftArrow)`
  background-image: url(${require('@/assets/img/right.png')});
  right: 1px;
  left: auto;
`;