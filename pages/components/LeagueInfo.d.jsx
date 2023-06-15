import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MembershipsByTeam from '../components/MemberShipByTeam.d';

const LeagueInfo = ({ leagueId, onTeamSelect }) => {
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLeagueInfo = async () => {
      try {
        const response = await fetch(`https://api.sportsdata.io/v3/csgo/scores/json/CompetitionDetails/${leagueId}?key=167bc5b286e24056b6976303d4d9a68a`);
        const data = await response.json();
        setLeagueInfo(data);
      } catch (error) {
        console.log('Error fetching league info:', error);
      }
    };

    if (leagueId) {
      fetchLeagueInfo();
    }
  }, [leagueId]);

  if (!leagueInfo) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#de9b35" />
      </div>
    );
  }

  const filteredTeams = leagueInfo.Teams.filter(team => team.Players.length > 0 && team.Players.some(player => player.MatchName));

  const handleTeamSelect = (teamId) => {
    setSelectedTeamId(teamId);
    onTeamSelect(teamId); // Pass the selected team ID to the parent component
  };

  return (
    <Card className="main-card-csgo bg-dark">
      <Card.Header>
        <h2>
          <center>CSGO League Teams {leagueId}</center>
        </h2>
      </Card.Header>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {filteredTeams.map((team, teamIndex) => (
          <Card key={team.TeamId} className="bg-dark" style={{ flex: '0 1 calc(33.33% - 10px)', marginBottom: '10px' }}>
            <Card.Body>
              <Card.Title>{team.Name}</Card.Title>
              <Card.Text>
                <p>Country: {team.AreaName}</p>
                <h5>Players:</h5>
                {team.Players.slice(0, 6).map((player, playerIndex) => (
                  <div key={player.PlayerId}>
                    <p>{`#${teamIndex + 1}.${playerIndex + 1}`}</p>
                    <p>Name: {player.FirstName} {player.LastName}</p>
                    <p>Nationality: {player.Nationality}</p>
                  </div>
                ))}
              </Card.Text>
              {/* <Link href={`/team/${team.TeamId}`} passHref>
                <Button className='team-info-button'>View Team Info</Button>
              </Link> */}
              <Button className='team-info-button' onClick={() => handleTeamSelect(team.TeamId)}>Select Team</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {selectedTeamId && (
        <MembershipsByTeam teamId={selectedTeamId} />
      )}
    </Card>
  );
};

export default LeagueInfo;
