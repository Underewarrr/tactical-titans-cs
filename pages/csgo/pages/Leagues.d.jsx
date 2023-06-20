import React, { useEffect, useState } from 'react';
import LeaguesList from '../widgets/LeaguesList.d'
import LeagueInfo from '../widgets/LeagueInfo.d';
//import MembershipsByTeam from '../components/MemberShipByTeam.d';
//import PlayerByTeam from '../widgets/PlayerByTeam.d'
import SteamLink from '../widgets/SteamLink';
import CurrentLeagues from '../leagues/CurrentLeagues';

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
      <CurrentLeagues />
    </div></>
  );
};

export default Leagues;
