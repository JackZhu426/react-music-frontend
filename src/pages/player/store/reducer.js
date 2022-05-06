import { Map } from 'immutable';

import {
  CHANGE_PLAY_LIST,
  CHANGE_CURRENT_SONG,
  CHANGE_CURRENT_SONG_INDEX,
  CHANGE_SEQUENCE,
  CHANGE_LYRICS,
  CHANGE_CURRENT_LYRICS_IDX,
} from './constants';

const playerInfo = Map({
  playList: [],
  currentSong: {},
  currentSongIdx: 0,
  sequence: 0, // 0-循环，1-随机，2-单曲
  lyrics: [],
  currentLyricsIdx: 0,
});

function playerReducer(state = playerInfo, action) {
  switch (action.type) {
    case CHANGE_PLAY_LIST:
      return state.set('playList', action.playList);
    case CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong);
    case CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIdx', action.currentSongIdx);
    case CHANGE_SEQUENCE:
      return state.set('sequence', action.sequence);
    case CHANGE_LYRICS:
      return state.set('lyrics', action.lyrics);
    case CHANGE_CURRENT_LYRICS_IDX:
      return state.set('currentLyricsIdx', action.currentLyricsIdx);
    default:
      return state;
  }
}

export default playerReducer;
