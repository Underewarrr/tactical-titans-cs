import React, { useEffect, useState } from 'react';
import LeaguesList from '../components/LeaguesList';
import LeagueInfo from '../components/LeagueInfo.d';
import MembershipsByTeam from '../components/MemberShipByTeam.d';

const Leagues = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleLeagueSelect = (leagueId) => {
    setSelectedLeagueId(leagueId);
    setSelectedTeamId(null); // Reset the selected team ID when a new league is selected
  };

  const handleTeamSelect = (teamId) => {
    setSelectedTeamId(teamId);
  };

  return (
    <div className='main-card-csgo'>
      <center>
      <h2>CSGO Leagues and Teams</h2>

      </center>
      <LeaguesList onLeagueSelect={handleLeagueSelect} />
      {selectedLeagueId && !selectedTeamId && (
        <LeagueInfo leagueId={selectedLeagueId} onTeamSelect={handleTeamSelect} />
      )}
      {selectedTeamId && (
        <MembershipsByTeam teamId={selectedTeamId} />
      )}
    </div>
  );
};

export default Leagues;
