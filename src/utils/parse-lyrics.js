/**
 * @param {*} originLyrics 
 * [00:00.696] 项目总监 : 庄有豪
[00:00.783] 出品人 : 潘鸿业
[00:00.870] OP : 北京金翼龙国际文化传媒有限公司
[00:00.957] 「未经著作权人书面许可 不得以任何方式（包括翻唱、翻录等）使用」
[00:01.50]你轻轻地走过那
[00:03.63]在风雨花丛中
[00:05.76]每一点一滴带走
[00:07.86]是我醒来的梦
[00:10.02]是在那天空上
 */

export const parseLyrics = (originLyrics) => {
  // regex, 解析时间 - e.g. [00:00.696]
  const parseRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  //   每一句的 {时间(ms), 歌词内容(content)} 放到数组里
  const lyricArr = [];
  // 1. split行
  const lineStrings = originLyrics.split('\n');
  for (let everyLine of lineStrings) {
    //  防止空值：最后一行 \n
    if (everyLine) {
      const parsedTime = parseRegExp.exec(everyLine);
      if (!parsedTime) continue;
      //   console.log(parsedTime);
      /**
       * 0: "[00:37.380]"
       * 1: "00"
       * 2: "37"
       * 3: "380"
       * groups: undefined
       * index: 0
       * input: "[00:37.380] 作曲 : 盛晓萌"
       * length: 4
       */
      const min = parsedTime[1];
      const sec = parsedTime[2];
      const ms =
        parsedTime[3].length === 3 ? parsedTime[3] * 1 : parsedTime[3] * 10; // 判断3位还是2位？ *1或者*10是为了把String转为number
      const totalMs = min * 60 * 1000 + sec * 1000 + ms;
      const content = everyLine.replace(parseRegExp, '').trim();
      const lineObj = { totalMs, content };
      lyricArr.push(lineObj);
    }
  }
  return lyricArr;
};
