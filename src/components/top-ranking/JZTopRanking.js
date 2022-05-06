import React, { memo } from 'react';
import { TopRankingWrapper } from './style';
import { resizePic } from '@/utils/format-utils';
import { getCurrentSongDetailsAction } from '../../pages/player/store/actionCreators';
import { useDispatch } from 'react-redux';

const JZTopRanking = memo((props) => {
  // props and state
  const { info = [] } = props;
  const { tracks = [] } = info;

  const dispatch = useDispatch();

  // functions
  const playChosenMusic = (ids) => {
    dispatch(getCurrentSongDetailsAction(ids));
  };

  return (
    <TopRankingWrapper>
      {/* 最上面: e.g. cover<img> + '飙升榜'<a> + play icon<button> + favorite icon<icon> */}
      <div className="header">
        <div className="image">
          <img src={resizePic(info.coverImgUrl, 80)} alt="ranking cover" />
          {/* blurred cover */}
          <a href="/todo" className="image_cover">
            ranking
          </a>
        </div>
        <div className="info">
          <a href="/todo">{info.name}</a>
          {/* div for line shift */}
          <div>
            <button className="btn play">play</button>
            <button className="btn favor">favor</button>
          </div>
        </div>
      </div>
      {/* 中间：list - 排行榜 10条数据 */}
      <div className="list">
        {tracks.slice(0, 10).map((item, index) => {
          return (
            <div className="list-item" key={item.id}>
              {/*  第几名 */}
              <div className="rank">{index + 1}</div>
              {/* 歌曲名称 + hover后的: play + addto + favor */}
              <div className="info">
                {/* 歌曲名称 */}
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate ">
                  <button
                    className="btn play"
                    onClick={(e) => {
                      playChosenMusic(item.id);
                    }}
                  ></button>
                  <button className="btn addto"></button>
                  <button className="btn favor"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <a href="/todo">查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  );
});

export default JZTopRanking;
