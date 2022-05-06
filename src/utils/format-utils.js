// 播放量
export const getCount = (count) => {
  if (count < 10000) return count;
  if (Math.floor(count / 1000) < 1000)
    return Math.floor(count / 100) / 10 + 'k';
  return Math.floor(count / 100000) / 10 + 'm';
};

// 图片大小
export const resizePic = (picUrl, size) => {
  return `${picUrl}?param=${size}x${size}`;
};

// 时间转换：milliseconds to mm:ss
export const msToMinAndSec = (milliseconds) => {
  // e.g. 241840ms
  let ms = milliseconds % 1000; // 840ms
  let s = (milliseconds - ms) / 1000; // 241s
  let ss = s % 60; // 241s % 60 = 1s
  if (ss <= 10) ss = '0' + ss;
  let m = (s - ss) / 60; // 240s / 6 = 4m
  let mm = m % 60; // 4 % 60 = 4;
  if (mm <= 10) mm = '0' + mm;
  return `${mm}:${ss}`;
};

// 拿到播放链接, id拼接
export function getPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
