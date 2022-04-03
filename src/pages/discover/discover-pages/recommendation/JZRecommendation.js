import React, { memo, useEffect, useState } from 'react';
import JZTopBanners from './child-components/top-banners';
import JZHotRecommend from './child-components/hot-recommend';
import JZNewAlbum from './child-components/new-album';
import JZRankingList from './child-components/ranking-list';
import JZUserLogin from './child-components/user-login';
import JZSettleSinger from './child-components/settle-singer';
import JZHotRadio from './child-components/hot-radio';
import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from './style';

// ** 2. 使用redux 的 hooks 写法 **
const JZRecommendation = memo((props) => {
  return (
    // 1）.style.js 样式包裹  2) 样式 (div) 里面放组件 (function components)
    <RecommendWrapper>
      <JZTopBanners />
      <Content className="wrap-v2">
        {/* 左边 */}
        <RecommendLeft>
          <JZHotRecommend />
          <JZNewAlbum />
          <JZRankingList />
        </RecommendLeft>
        {/* 右边 */}
        <RecommendRight>
          <JZUserLogin />
          <JZSettleSinger />
          <JZHotRadio />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
});

// 1. 不用hooks的写法：redux - 1) mapStateToProps: 数据变成props  2) mapDispatchToProps: store.dispatch() 方法变成props  3) connect() 的HOC来调用，注意要用 useEffect() 后渲染一次
// const JZRecommendation = memo((props) => {
//   // componentDidMount() & componentDidUpdate()
//   useEffect(() => {
//     props.getBanners();
//   }, [props.getBanners]);
//   return (
//     <div>
//       {props.banners.map((item, index) => {
//         return (
//           <div key={index}>
//             <img src={item.imageUrl} alt="banner" />
//           </div>
//         );
//       })}
//     </div>
//   );
// });

// const mapStateToProps = (state) => {
//   return {
//     banners: state.recommendInfo.banners,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   getBanners: function () {
//     dispatch(getBanners());
//   },
// });

export default JZRecommendation;
