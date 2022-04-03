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
