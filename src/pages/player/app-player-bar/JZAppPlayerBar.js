import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { Slider, message } from 'antd';
import {
  PlaybarWrapper,
  PlayInfo,
  Operator,
  Control,
  LyricMessageWrapper,
} from './style';

import {
  getCurrentSongDetailsAction,
  changeSequenceAction,
  changeLyricsIdxAction,
} from '../store/actionCreators';
import { resizePic, msToMinAndSec, getPlayUrl } from '@/utils/format-utils';

const JZAppPlayerBar = memo(() => {
  // props and states
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  // 逻辑：如果在改变【滑动条】，i.e. <Slider onChange={}>, 就不改变播放时候的progress
  const [isChanging, setIsChanging] = useState(false);
  // 歌曲是否在播放中
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. get dispatch object
  const dispatch = useDispatch();

  // 3. redux hooks, to select particular state(s)
  const {
    currentSong,
    sequence,
    currentSongIdx,
    playList,
    lyrics,
    currentLyricsIdx,
  } = useSelector(
    (state) => ({
      currentSong: state.getIn(['playerInfo', 'currentSong']),
      sequence: state.getIn(['playerInfo', 'sequence']),
      currentSongIdx: state.getIn(['playerInfo', 'currentSongIdx']),
      playList: state.getIn(['playerInfo', 'playList']),
      lyrics: state.getIn(['playerInfo', 'lyrics']),
      currentLyricsIdx: state.getIn(['playerInfo', 'currentLyricsIdx']),
    }),
    shallowEqual
  );

  // 4. get reference(s)
  const audioRef = useRef();

  // componentDidMount() 和 componentDidUpdate()
  useEffect(() => {
    // 每次改变，都会componentDidUpdate(), 设置src
    audioRef.current.src = getPlayUrl(currentSong && currentSong.id);
    // 页面render后，设置逻辑 - 自动播放
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  // variables:
  // 1) song's total duration time
  // 2) <Slider> attr: value={}
  const durationTime = currentSong && currentSong.dt;

  // 5. handle functions

  // 点击 播放/暂停 按钮
  const playMusic = useCallback(() => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // 播放上一首/下一首/随机歌曲
  const goToSong = (num) => {
    let idx = 0;
    if (sequence === 1) {
      // 随机播放
      idx = Math.floor(playList.length * Math.random());
      while (idx === currentSongIdx) {
        idx = Math.floor(playList.length * Math.random());
      }
    } else {
      // 单曲 或者 循环播放
      // 根据num值，播放next或者prev的歌曲；
      // next到最后一首，跳到第一首；prev到第一首，跳到最后一首
      idx = currentSongIdx + num;
      if (idx === playList.length) {
        idx = 0;
      } else if (idx < 0) {
        idx = playList.length - 1;
      }
    }
    const song = playList[idx];
    dispatch(getCurrentSongDetailsAction(song.id));
  };

  // 播放结束后
  const playWhenEnded = (e) => {
    if (sequence === 2) {
      // 单曲循环
      e.target.currentTime = 0;
      e.target.play();
    } else {
      // 循环播放 (0) 或 随机播放 (1)
      goToSong(1);
    }
  };

  // 在播放时，<audio> 监听回调函数属性 onTimeUpdate = () => {}
  const playTimeUpdate = (e) => {
    if (!isChanging) {
      // 更新当前播放的时间；播放的时候，如果在滑动进度条，时间不更新 (currentTime是s, * 1000 = 拿到ms)
      setCurrentTime(e.target.currentTime * 1000);
      // 设置滑动条的进度；播放的时候，如果在滑动进度条，进度条不抢着更新
      setProgress(((e.target.currentTime * 1000) / durationTime) * 100);
    }

    /**
     * 更新歌词（无论是否在拖动进度条)
     * {totalMs: 1980, content: '可风吹呀吹 吹呀吹 吹不散你背影'}
     * {totalMs: 7530, content: '可雨飘呀飘 飘呀飘'}
     * {totalMs: 13380, content: '可能只有耳际经过的风'}
     */
    let i = 0;
    for (; i < lyrics.length; i++) {
      if (e.target.currentTime * 1000 < lyrics[i].totalMs) {
        break;
      }
    }
    if (currentLyricsIdx !== i - 1) {
      console.log('currentLyricsIdx:', currentLyricsIdx);
      dispatch(changeLyricsIdxAction(i - 1));
      // message.info(lyrics[i - 1] && lyrics[i - 1].content);
    }
  };

  // 滑动或者点击【进度条】到一个位置；value: 0 - 100
  const sliderOnChange = useCallback(
    (value) => {
      // 设置正在changing, 不让<audio>里的playTime() 设置progress 和 currentTime (但是还是继续播放的，只是不重复设置)
      setIsChanging(true);
      // 滑动条 —— 设置进度条progress (i.e. value={})
      setProgress(value);
      // 鼠标移动滑块的时候，时间随之改变 (i.e. setCurrentTime)
      setCurrentTime((value / 100) * durationTime);
    },
    [durationTime]
  );

  // 【进度条】改变后 最后落到的位置；value: 0 - 100
  const sliderAfterChange = useCallback(
    (value) => {
      // callback的参数value, 拿到当前值 (0-100), 并算出after change的当前时间
      const timeAfterChange = (value / 100) * durationTime;
      // 设置currentTime
      setCurrentTime(timeAfterChange);
      // 松开鼠标 —— 设置进度条progress (i.e. value={})
      setProgress(value);
      // 重要：设置 播放组件<audio>真正的当前播放时间 (s)；（ 要放在setIsChanging(false) 之前)
      audioRef.current.currentTime = timeAfterChange / 1000;
      // 设置至 “没有在变化”
      setIsChanging(false);
      // 如果没有播放, 移动到某个位置，且播放
      if (!isPlaying) {
        playMusic();
      }
    },
    [durationTime, isPlaying, playMusic]
  );

  // 改变歌曲播放：0-循环，1-随机，2-单曲
  const changeSequence = useCallback(() => {
    dispatch(changeSequenceAction(sequence === 2 ? 0 : sequence + 1));
  }, [sequence, dispatch]);

  return (
    <>
      <LyricMessageWrapper>
        {lyrics[currentLyricsIdx] && lyrics[currentLyricsIdx].content}
      </LyricMessageWrapper>
      <PlaybarWrapper className="sprite_playbar">
        {/* flex: 中间 播放，前进，后退按钮 + 进度条 + 其他按钮 */}
        <div className="content wrap-v2">
          {/* 播放，前进，后退 */}
          <Control isPlaying={isPlaying}>
            <button
              className="prev sprite_playbar"
              onClick={(e) => {
                goToSong(-1);
              }}
            ></button>
            <button
              className="play sprite_playbar"
              onClick={(e) => {
                playMusic();
              }}
            ></button>
            <button
              className="next sprite_playbar"
              onClick={(e) => {
                goToSong(1);
              }}
            ></button>
          </Control>
          {/* 进度条 + cover + 歌曲名称 */}
          <PlayInfo>
            <div className="image">
              <NavLink to="/discover/player">
                <img
                  src={resizePic(
                    currentSong && currentSong.al && currentSong.al.picUrl,
                    30
                  )}
                  alt="cover pic"
                />
              </NavLink>
            </div>
            <div className="info">
              <div className="song">
                {/* song */}
                <span>{currentSong && currentSong.name}</span>
                {/* singer */}
                <span className="singer-name">
                  {currentSong.ar && currentSong.ar[0].name}
                </span>
              </div>
              <div className="progress">
                <Slider
                  defaultValue={30}
                  value={progress}
                  onChange={sliderOnChange}
                  onAfterChange={sliderAfterChange}
                />
                <div className="time">
                  <span className="now-time">{msToMinAndSec(currentTime)}</span>
                  <span className="divider">/</span>
                  {/* total time */}
                  <span>{msToMinAndSec(durationTime)}</span>
                </div>
              </div>
            </div>
          </PlayInfo>
          {/* 收藏、 分享 等 icons */}
          <Operator sequence={sequence}>
            <div className="left">
              <button className="btn favor sprite_playbar"></button>
              <button className="btn share sprite_playbar"></button>
            </div>
            <div className="right sprite_playbar">
              <button className="sprite_playbar btn volume"></button>
              <button
                className="sprite_playbar btn loop"
                onClick={changeSequence}
              ></button>
              <button className="sprite_playbar btn playlist"></button>
            </div>
          </Operator>
        </div>
        <audio
          ref={audioRef}
          onTimeUpdate={playTimeUpdate}
          onEnded={playWhenEnded}
        />
      </PlaybarWrapper>
    </>
  );
});

export default JZAppPlayerBar;
