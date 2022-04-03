import React, { memo } from 'react';
import { HeaderWrapper } from './style';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const JZThemeHeaderRecommend = memo((props) => {
  const { title, keywords, more } = props;
  return (
    <HeaderWrapper>
      <div className="left">
        <i className="left-icon"></i>
        <h3 className="title">{title}</h3>
        <div className="keyword">
          {keywords.map((item, index) => {
            return (
              <div className="item" key={item}>
                <NavLink to="#">{item}</NavLink>
                <span className="divider">|</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <NavLink to={more}>More</NavLink>
        <span className="icon"></span>
      </div>
    </HeaderWrapper>
  );
});

JZThemeHeaderRecommend.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array,
  more: PropTypes.string,
};

JZThemeHeaderRecommend.defaultProps = {
  keywords: [],
  more: '#',
};

export default JZThemeHeaderRecommend;
