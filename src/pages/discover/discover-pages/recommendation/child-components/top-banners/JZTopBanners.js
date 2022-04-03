import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getBanners } from '../../store/actionCreators';
import { BannerWrapper, LeftArrow, RightArrow } from './style';

const JZTopBanners = memo(() => {
  // 6. state, 存 5里的 to (即 current index)
  const [curIdx, setCurIdx] = useState(0);

  // 1. 获取数据
  // 2. 进行dispatch操作
  const dispatch = useDispatch();
  // 参数1：callback fn, 返回值赋值给该方法的返回值
  // 参数2：'shallowEqual' from 'react-redux', 进行浅层比较 (默认进行deep comparison)
  const { topBanners } = useSelector(
    (state) => ({
      // 语法1：
      // topBanners: state.get('recommendInfo').get('banners'),
      // 语法2：
      topBanners: state.getIn(['recommendInfo', 'banners']),
    }),
    shallowEqual
  );

  // 3. 发送网络请求 (componentDidMount() && componentDidUpdate())
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  // 4. useRef() - 拿到banner的ref，并绑定onClick事件
  const bannerRef = useRef();

  // 5. useCallback() - 场景：将父组件中的函数，
  // 传递给子组件进行回调使用时，使用useCallback() 进行性能优化；
  // 只是为了不进行多次re-render, 并不是为了函数进行缓存
  // 改变 <BannerWrapper> 的 background-image
  const bannerChange = useCallback((from, to) => {
    // to: 拿到当前的index
    // 返回 url的拼接的毛玻璃效果：?imageView&blur=40x20
    setCurIdx(to);
  }, []);

  // 一定要先判断 topBanners[curIdx] 是不是 undefined, 不是再返回拼接的 url
  const bgImg =
    topBanners[curIdx] && topBanners[curIdx].imageUrl + '?imageView&blur=40x20';

  return (
    <BannerWrapper bgImg={bgImg}>
      <LeftArrow
        onClick={() => {
          bannerRef.current.prev();
        }}
      />
      <div className="wrap-v2">
        <Carousel
          effect="fade"
          autoplay="true"
          ref={bannerRef}
          beforeChange={bannerChange}
        >
          {topBanners.map((item, index) => {
            return (
              <div key={item.imageUrl}>
                <img
                  src={item.imageUrl}
                  alt="pic"
                  style={{ margin: '0 auto' }}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <RightArrow
        onClick={() => {
          bannerRef.current.next();
        }}
      />
    </BannerWrapper>
  );
});

export default JZTopBanners;
