import {
  CHANGE_RECOMMEND_BANNERS,
  CHANGE_HOT_RECOMMEND,
  CHANGE_NEW_ALBUMS,
  CHANGE_SURGE_RANKING,
  CHANGE_NEW_RANKING,
  CHANGE_ORIGIN_RANKING,
  CHANGE_SETTLE_SINGERS,
} from './constants';
import { Map } from 'immutable';

// initial state
const recommendInfo = Map({
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  surgeRanking: {},
  newRanking: {},
  originRanking: {},
  settleSingers: [],
});

function recommendReducer(state = recommendInfo, action) {
  switch (action.type) {
    case CHANGE_RECOMMEND_BANNERS:
      return state.set('banners', action.banners);
    case CHANGE_HOT_RECOMMEND:
      return state.set('hotRecommends', action.hotRecommends);
    case CHANGE_NEW_ALBUMS:
      return state.set('newAlbums', action.newAlbums);
    case CHANGE_SURGE_RANKING:
      return state.set('surgeRanking', action.ranking);
    case CHANGE_NEW_RANKING:
      return state.set('newRanking', action.ranking);
    case CHANGE_ORIGIN_RANKING:
      return state.set('originRanking', action.ranking);
    case CHANGE_SETTLE_SINGERS:
      return state.set('settleSingers', action.settleSingers);
    default:
      return state;
  }
}

export default recommendReducer;
