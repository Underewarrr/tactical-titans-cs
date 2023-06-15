import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import MembershipsByTeam from './MemberShipByTeam.d';

const TeamInfo = ({ teamId }) => {
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(`https://api.sportsdata.io/v3/csgo/scores/json/HistoricalMembershipsByTeam/${teamId}?key=167bc5b286e24056b6976303d4d9a68a`);
        const data = await response.json();
        setTeamInfo(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching team info:', error);
      }
    };

    if (teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  if (!teamInfo) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }

  return (
    <MembershipsByTeam teamId={teamId} />
  );
};

export default TeamInfo;
