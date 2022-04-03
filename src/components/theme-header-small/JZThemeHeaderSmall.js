import React, { memo } from 'react';
import { HeaderWrapper } from './style';
import PropTypes from 'prop-types';

const JZThemeHeaderSmall = memo((props) => {
  // props and states
  const { title, more } = props;
  return (
    <HeaderWrapper>
      <h3>{title}</h3>
      <a href="/todo">{more}</a>
    </HeaderWrapper>
  );
});

JZThemeHeaderSmall.propTypes = {
  title: PropTypes.string.isRequired,
  more: PropTypes.string,
};

JZThemeHeaderSmall.defaultProps = {
  title: '',
  more: '',
};

export default JZThemeHeaderSmall;
