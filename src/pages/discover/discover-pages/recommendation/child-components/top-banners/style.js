import styled from 'styled-components';

// 背景图：毛玻璃效果 (css属性：background-image, background-size, background-position)
export const BannerWrapper = styled.div`
  background-color: transparent;
  background-image: url(${(props) => props.bgImg});
  background-size: 6000px;
  background-position: center;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
`;

export const LeftArrow = styled.button`
  background-color: transparent;
  position: absolute;
  background-image: url(${require('@/assets/img/left.png')});
  background-size: contain;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 100px;
  transform: translate(0, -50%);
  cursor: pointer;
`;

export const RightArrow = styled(LeftArrow)`
  background-image: url(${require('@/assets/img/right.png')});
  right: 100px;
  left: auto;
`;
