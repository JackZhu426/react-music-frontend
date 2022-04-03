import styled from 'styled-components';

export const HotRadioWrapper = styled.div`
  padding: 20px;

  .radio-list {
    margin-top: 20px;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      width: 210px;
      .image {
        img {
          width: 40px;
          height: 40px;
        }
      }

      .info {
        width: 160px;
        margin-left: 8px;
        .name {
          color: #000;
          font-weight: 700;
        }

        .position {
          color: #666;
        }
      }
    }
  }
`;
