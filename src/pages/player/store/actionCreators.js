import {
  CHANGE_PLAY_LIST,
  CHANGE_CURRENT_SONG,
  CHANGE_CURRENT_SONG_INDEX,
  CHANGE_SEQUENCE,
  CHANGE_LYRICS,
  CHANGE_CURRENT_LYRICS_IDX,
} from './constants';
import { getSongDetails, getLyrics } from '@/services/player.js';
import { parseLyrics } from '@/utils/parse-lyrics';

// private actions ↓:
const changePlayListAction = (playList) => ({
  type: CHANGE_PLAY_LIST,
  playList,
});

const changeCurrentSongIndexAction = (currentSongIdx) => ({
  type: CHANGE_CURRENT_SONG_INDEX,
  currentSongIdx,
});

const changeCurrentSongAction = (currentSong) => ({
  type: CHANGE_CURRENT_SONG,
  currentSong,
});

export const changeSequenceAction = (sequence) => ({
  type: CHANGE_SEQUENCE,
  sequence,
});

const changeLyricsAction = (lyrics) => ({
  type: CHANGE_LYRICS,
  lyrics,
});



// public actions ↓:
export const changeLyricsIdxAction = (currentLyricsIdx) => ({
  type: CHANGE_CURRENT_LYRICS_IDX,
  currentLyricsIdx,
});

export const getCurrentSongDetailsAction = (ids) => {
  return (dispatch, getState) => {
    // 1. 检查playList[]里是否有该歌曲
    const playList = getState().getIn(['playerInfo', 'playList']);
    const idx = playList.findIndex((value) => {
      return value.id === ids;
    });

    // 2. 判断是否找到了歌曲
    let currentSong = null;
    if (idx !== -1) {
      // 找到了：1）设置当前播放index  2）改变当前歌曲
      currentSong = playList[idx];
      dispatch(changeCurrentSongIndexAction(idx));
      dispatch(changeCurrentSongAction(currentSong));
    } else {
      // 没找到 (idx === -1)：1）去服务器取json数据  2）加到playList[]的最后一个index  3）重新设置当前播放idx
      getSongDetails(ids).then((res) => {
        currentSong = res.songs && res.songs[0];
        console.log('current song id:', currentSong.id);
        // 多判断一层，歌曲不存在 - return
        if (!currentSong) return;
        // 1. 改变当前播放歌曲
        dispatch(changeCurrentSongAction(currentSong));
        // 2. 添加到playList[]的最后一个index
        dispatch(changePlayListAction([...playList, currentSong]));
        // 3. 改变 (记录) 当前播放歌曲的index
        dispatch(changeCurrentSongIndexAction(playList.length));
      });
    }
    // 3. 设置歌曲歌词
    dispatch(getLyricsAction(ids));
  };
};

export const getLyricsAction = (id) => {
  return (dispatch) => {
    getLyrics(id).then((res) => {
      // 返回数组: [{时间(ms), 歌词内容(content)}, ...]
      const lyricsList = parseLyrics(res.lrc.lyric);
      dispatch(changeLyricsAction(lyricsList));
    });
  };
};
