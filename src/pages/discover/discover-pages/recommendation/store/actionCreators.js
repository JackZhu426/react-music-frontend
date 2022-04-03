import {
  CHANGE_RECOMMEND_BANNERS,
  CHANGE_HOT_RECOMMEND,
  CHANGE_NEW_ALBUMS,
  CHANGE_SURGE_RANKING,
  CHANGE_NEW_RANKING,
  CHANGE_ORIGIN_RANKING,
  CHANGE_SETTLE_SINGERS,
} from './constants';
import {
  changeBanners,
  getHotRecommend,
  getNewAlbums,
  getRanking,
  getArtists,
} from '@/services/recommendation';

// all actions (to reducer):
export const changeBannersAction = (res) => ({
  type: CHANGE_RECOMMEND_BANNERS,
  banners: res.banners,
});

export const changeHotRecommendAction = (res) => ({
  type: CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result,
});

export const changeNewAlbumsAction = (res) => ({
  type: CHANGE_NEW_ALBUMS,
  newAlbums: res.albums,
});

export const changeSurgeRankingAction = (res) => ({
  type: CHANGE_SURGE_RANKING,
  ranking: res.playlist,
});
export const changeNewRankingAction = (res) => ({
  type: CHANGE_NEW_RANKING,
  ranking: res.playlist,
});
export const changeOriginRankingAction = (res) => ({
  type: CHANGE_ORIGIN_RANKING,
  ranking: res.playlist,
});
export const changeSettleSingersAction = (res) => ({
  type: CHANGE_SETTLE_SINGERS,
  settleSingers: res.artists,
});

// redux-thunk带的 (dispatch) 参数
// export const getMultiDataAction = (dispatch, getState) => {
//   axiosInstance({ url: '/banner' }).then((res) => {
//     console.log('res:', res.banners[0].imageUrl);
//     dispatch(changeBannersAction(res));
//   });
// };

// all actions from axios, then call (to reducer) action
// redux-thunk带的 (dispatch) 参数
export const getBanners = () => {
  return (dispatch) => {
    changeBanners().then((res) => {
      dispatch(changeBannersAction(res));
    });
  };
};

// redux-thunk带的 (dispatch) 参数
export const getHotRecommendList = (limit) => {
  return (dispatch) => {
    getHotRecommend(limit).then((res) => {
      dispatch(changeHotRecommendAction(res));
    });
  };
};

export const getNewAlbumsList = (limit) => {
  return (dispatch) => {
    getNewAlbums(limit).then((res) => {
      dispatch(changeNewAlbumsAction(res));
    });
  };
};

export const getRankingList = (idx) => {
  return (dispatch) => {
    getRanking(idx).then((res) => {
      if (idx === 3) {
        dispatch(changeSurgeRankingAction(res));
      } else if (idx === 0) {
        dispatch(changeNewRankingAction(res));
        console.log(res);
      } else if (idx === 2) {
        dispatch(changeOriginRankingAction(res));
      }
    });
  };
};

export const getSettleSingers = () => {
  return (dispatch) => {
    getArtists(5, 5001).then((res) => {
      dispatch(changeSettleSingersAction(res));
    });
  };
};
