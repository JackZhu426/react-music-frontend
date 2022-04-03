import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// recommendation页面下的 store
import { getSettleSingers } from '../../store/actionCreators';

// utils
import { resizePic } from '@/utils/format-utils';

// style css
import { SetterSongerWrapper } from './style';

// common component(s)
import JZThemeHeaderSmall from '@/components/theme-header-small';

import { NavLink } from 'react-router-dom';

// http://123.207.32.32:9001/artist/list
const JZSettleSinger = memo(() => {
  // 1. get dispatch
  const dispatch = useDispatch();
  // 2. useEffect() hooks, when this component didMount or didUpdate
  useEffect(() => {
    dispatch(getSettleSingers());
  }, [dispatch]);
  // 3. useSelector() to get the state in 'redux'
  const { settleSingers } = useSelector(
    (state) => ({
      settleSingers: state.getIn(['recommendInfo', 'settleSingers']),
    }),
    shallowEqual
  );
  return (
    <SetterSongerWrapper>
      <JZThemeHeaderSmall title="Singer" more="More &gt;" />
      <div className="singer-list">
        {settleSingers.map((item, index) => {
          return (
            <div key={item.id} className="item">
              <img src={resizePic(item.img1v1Url, 62)} alt="" />
              <div className="info">
                <p className="title">{item.alias.join(' ')}</p>
                <p className="name">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="apply-for">
        <NavLink to="/todo">申请成为网易音乐人</NavLink>
      </div>
    </SetterSongerWrapper>
  );
});

export default JZSettleSinger;
