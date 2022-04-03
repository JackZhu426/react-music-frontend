import React, { memo, useEffect } from 'react';
import { RankingWrapper } from './style';
import JZThemeHeaderRecommend from '@/components/theme-header-recommend';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getRankingList } from '../../store/actionCreators';
import JZTopRanking from '@/components/top-ranking';

/**
 * 飙升榜：http://123.207.32.32:9001/top/list?idx=3
 * 新歌榜：http://123.207.32.32:9001/top/list?idx=0
 * 原创榜：http://123.207.32.32:9001/top/list?idx=2
 */
const JZRankingList = memo((props) => {
  // 1. get dispatch hooks
  const dispatch = useDispatch();

  // 2. dispatch action using redux-thunk
  // when componentDidMount() & componentDidUpdate()
  useEffect(() => {
    // surge ranking
    dispatch(getRankingList(3));
    // new ranking
    dispatch(getRankingList(0));
    // origin ranking
    dispatch(getRankingList(2));
  }, [dispatch]);

  // 3. fetch data: just like mapStateToProps()
  const { surgeRankingList, newRankingList, originRankingList } = useSelector(
    (state) => ({
      surgeRankingList: state.getIn(['recommendInfo', 'surgeRanking']),
      newRankingList: state.getIn(['recommendInfo', 'newRanking']),
      originRankingList: state.getIn(['recommendInfo', 'originRanking']),
    }),
    shallowEqual
  );

  return (
    <RankingWrapper>
      <JZThemeHeaderRecommend title="Ranking" />
      <div className="tops">
        <JZTopRanking info={surgeRankingList} />
        <JZTopRanking info={newRankingList} />
        <JZTopRanking info={originRankingList} />
      </div>
    </RankingWrapper>
  );
});

export default JZRankingList;
