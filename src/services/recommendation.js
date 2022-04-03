import request from './request';

export const changeBanners = () => {
  // return 一个promise对象
  return request({ url: '/banner' });
};

export const getHotRecommend = (limit) => {
  return request({ url: '/personalized', params: { limit } });
};

export const getNewAlbums = (limit) => {
  return request({ url: '/top/album', params: { limit } });
};

export const getRanking = (idx) => {
  return request({ url: '/top/list', params: { idx } });
};

export const getArtists = (limit, cat) => {
  return request({ url: '/artist/list', params: { limit, cat } });
};
