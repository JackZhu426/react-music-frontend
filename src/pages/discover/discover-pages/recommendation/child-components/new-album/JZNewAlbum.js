import React, { memo, useEffect, useRef } from 'react';
import JZThemeHeaderRecommend from '@/components/theme-header-recommend';
import { AlbumWrapper } from './style';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNewAlbumsList } from '../../store/actionCreators';
import { LeftArrow, RightArrow } from './style';
import { Carousel } from 'antd';
import JZAlbumCover from '@/components/album-cover';

// http://123.207.32.32:9001/top/album?limit=10
const JZNewAlbum = memo((props) => {
  // 1. get redux 'dispatch'
  const dispatch = useDispatch();

  // 2. when componentDidMoun() & componentDidUpdate()
  // fetch data
  useEffect(() => {
    dispatch(getNewAlbumsList(10));
  }, [dispatch]);

  // 3. get data which 'dispatch' fetched
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommendInfo', 'newAlbums']),
    }),
    shallowEqual
  );

  // 4. useRef() to get Carousel's reference
  const albumRef = useRef();

  return (
    <AlbumWrapper>
      <JZThemeHeaderRecommend title="New Albums" />
      <div className="content">
        <LeftArrow
          onClick={() => {
            albumRef.current.prev();
          }}
        />
        <div className="album">
          <Carousel ref={albumRef} dots={false}>
            {/* 2页，每页5个, 一共10个 */}
            {[0, 1].map((item, index) => (
              <div key={item} className="page">
                {/*  先切割(slice), 再map遍历 */}
                {newAlbums
                  .slice(item * 5, (item + 1) * 5)
                  .map((item2, indey) => (
                    <JZAlbumCover
                      key={item2.id}
                      info={item2}
                      size={100}
                      width={118}
                      bgp={-570}
                    />
                  ))}
              </div>
            ))}
          </Carousel>
        </div>
        <RightArrow
          onClick={() => {
            albumRef.current.next();
          }}
        />
      </div>
    </AlbumWrapper>
  );
});

export default JZNewAlbum;
