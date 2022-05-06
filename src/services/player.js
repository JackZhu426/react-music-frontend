import request from './request';

// 拿到歌曲详情的obj
export function getSongDetails(ids) {
  return request({
    url: '/song/detail',
    params: { ids },
  });
}

// 拿到歌词的obj
export function getLyrics(id) {
  return request({ url: '/lyric', params: { id } });
}
