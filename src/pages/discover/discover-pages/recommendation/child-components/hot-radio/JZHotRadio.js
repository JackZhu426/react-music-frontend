import React, { memo } from 'react';

import { hotRadios } from '@/common/local-data';
import JZThemeHeaderSmall from '@/components/theme-header-small';
import { HotRadioWrapper } from './style';

const JZHotRadio = memo(() => {
  return (
    <HotRadioWrapper>
      <JZThemeHeaderSmall title="Anchor" />
      <div className="radio-list">
        {hotRadios.map((item, index) => (
          <div className="item">
            <div className="image">
              <img src={item.picUrl} alt="" />
            </div>
            <div className="info">
              <p className="name">{item.name}</p>
              <p className="position text-nowrap">{item.position}</p>
            </div>
          </div>
        ))}
      </div>
    </HotRadioWrapper>
  );
});

export default JZHotRadio;
