import React, { memo } from 'react';
import { PlayerWrapper, PlayerLeft, PlayerRight } from './style';
import JZPlayerInfo from './child-components/player-info';
import JZPlayerComment from './child-components/player-comment';
import JZPlayerSongs from './child-components/player-songs';
import JZPlayerRelevant from './child-components/player-relevant';

const JZPlayer = memo(() => {
  return (
    <PlayerWrapper className="wrap-v2">
      <div className="wrap-v2 content">
        <PlayerLeft>
          <JZPlayerInfo />
          <JZPlayerComment />
        </PlayerLeft>
        <PlayerRight>
          <JZPlayerSongs />
          <JZPlayerRelevant />
        </PlayerRight>
      </div>
    </PlayerWrapper>
  );
});

export default JZPlayer;
