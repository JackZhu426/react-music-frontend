import React, { memo } from 'react';
import { AlbumWrapper } from './style';
import { resizePic } from '@/utils/format-utils';

const JZAlbumCover = memo((props) => {
  // state and props
  const { info, size = 153, width = 130, bgp = -845 } = props;
  return (
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        {/* 专辑主图 */}
        <img src={resizePic(info.picUrl, size)} alt="cover pic" />
        {/* cover 透明毛玻璃 + cd, 和 collection-cover不一样的是: 这里用 <a> */}
        <a href="#" className="cover sprite_covor"></a>
      </div>
      <div className="album-info">
        <div className="name">{info.name}</div>
        <div className="artist">{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  );
});

export default JZAlbumCover;
