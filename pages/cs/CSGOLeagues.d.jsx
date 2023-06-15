import React, { useEffect, useState } from 'react';
import Competition from '../components/Competition.d';
import LeagueInfo from '../components/LeagueInfo.d';

const Leagues = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);

  const handleLeagueSelect = (leagueId) => {
    setSelectedLeagueId(leagueId);
  };

  return (
    <div>
      <h1>CSGO App</h1>
      <Competition onLeagueSelect={handleLeagueSelect} />
      {selectedLeagueId && <LeagueInfo leagueId={selectedLeagueId} />}
    </div>
  );
};

export default Leagues;
