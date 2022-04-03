import React, { memo } from 'react';
import { CollectionCoverWrapper } from './style';
import { getCount, resizePic } from '@/utils/format-utils.js';

const JZCollectionCover = memo((props) => {
  // 通过父传子，传入props给该组件使用
  const { info, rightMargin } = props;

  return (
    <CollectionCoverWrapper right={rightMargin}>
      {/* div内包含封面图、 icons, info; 需要 position: relative */}
      <div className="cover-top">
        {/* 封面图 img  */}
        <img src={resizePic(info.picUrl, 140)} alt="cover page" />
        {/* 毛玻璃cover效果：(.cover: position: absolute) */}
        <div className="cover sprite_covor">
          {/* whole info (.info: position: absolute) */}
          <div className="info sprite_covor">
            <span>
              {/* earpiece icon (.erji) */}
              <i className="erji"></i>
              {/* playCount: e.g. 50万 */}
              {getCount(info.playCount)}
            </span>
            {/* play icon (.play) */}
            <i className="play"></i>
          </div>
        </div>
      </div>
      {/* result.name */}
      <div className="cover-bottom">{info.name}</div>
      {/* result.copyrighter */}
      <div className="cover-source">{info.copywriter || 'anonymous'}</div>
    </CollectionCoverWrapper>
  );
});

export default JZCollectionCover;
