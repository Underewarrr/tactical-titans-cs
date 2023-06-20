import React, { useEffect, useState } from 'react';
import LeaguesList from '../csgo/score/LeaguesList.d'
import LeagueInfo from '../components/LeagueInfo.d';
//import MembershipsByTeam from '../components/MemberShipByTeam.d';
import PlayerByTeam from '../components/PlayerByTeam.d'
import SteamLink from '../components/SteamLink';
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
    <><SteamLink link="https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/" /><div className='main-card-csgo'>
      <center>
        <h2>CSGO Leagues and Teams</h2>

      </center>
      <LeaguesList onLeagueSelect={handleLeagueSelect} />

      {selectedLeagueId && !selectedTeamId && (
        <LeagueInfo leagueId={selectedLeagueId} onTeamSelect={handleTeamSelect} />
      )}
      {selectedTeamId && (
        // <MembershipsByTeam teamId={selectedTeamId} />
        <PlayerByTeam teamId={selectedTeamId} />
      )}
    </div></>
  );
};

export default Leagues;
