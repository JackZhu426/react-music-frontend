import React, { memo, useEffect } from 'react';
import { HotRecommendWrapper } from './style';
import JZThemeHeaderRecommend from '@/components/theme-header-recommend';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getHotRecommendList } from '../../store/actionCreators';
import JZCollectionCover from '@/components/collection-cover';

const JZHotRecommend = memo(() => {
  // 1. 拿到dispatch - redux hooks
  const dispatch = useDispatch();

  // 2. 发送网络请求 - hooks
  useEffect(() => {
    dispatch(getHotRecommendList(8));
  }, [dispatch]);

  // 3. 拿到 reducer 里的 state 数据 - redux hooks
  const { hotRecommendList } = useSelector(
    (state) => ({
      hotRecommendList: state.getIn(['recommendInfo', 'hotRecommends']),
    }),
    shallowEqual
  );

  return (
    <HotRecommendWrapper>
      <JZThemeHeaderRecommend
        title="Hot Recommend"
        keywords={['Pop', 'Rock', 'Jazz', 'Blues', 'Folk']}
      />
      <div className="recommend-list">
        {hotRecommendList.map((item, index) => {
          return (
            <JZCollectionCover info={item} key={item.id}/>
          )
        })}
      </div>
    </HotRecommendWrapper>
  );
});

export default JZHotRecommend;
