import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import GamesByDate from './GamesByDate.d';
import ReactLoading from 'react-loading';
import useLocalStorage from '../hooks/useLocalStorage';

const Leagues = ({ onLeagueSelect }) => {
  const [scores, setScores] = useLocalStorage('scores', []);
  const [lastDate, setLastDate] = useLocalStorage('lastDate', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.sportsdata.io/v3/csgo/scores/json/Competitions?key=167bc5b286e24056b6976303d4d9a68a')
      .then(response => response.json())
      .then(data => {
        setScores(data);
        setLoading(false);
      });
  }, [setScores]);

  const handleLeagueClick = (competitionId) => {
    const league = scores.find(competition => competition.CompetitionId === competitionId);
    if (league && league.Seasons.length > 0) {
      const lastSeason = league.Seasons[league.Seasons.length - 1];
      const endDate = new Date(lastSeason.EndDate).toISOString().split('T')[0];
      setLastDate(endDate);
    }
    onLeagueSelect(competitionId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#de9b35" />
      </div>
    );
  }

  return (
    <div>
      <Card className="main-card-csgo bg-dark">
        <Card.Header>
          <h2>
            <center>CSGO Leagues</center>
          </h2>
        </Card.Header>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {scores.map(competition => (
            <Card
              className="bg-dark"
              key={competition.CompetitionId}
              style={{ flex: '0 1 calc(33.33% - 10px)', marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => handleLeagueClick(competition.CompetitionId)}
            >
              <Card.Body>
                <Card.Title>{competition.Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{competition.Seasons[0].Name}</Card.Subtitle>
                <Card.Text>
                  Start Date: {competition.Seasons[0].StartDate}<br />
                  End Date: {competition.Seasons[0].EndDate}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Card>
      {lastDate && <GamesByDate date={lastDate} />}
    </div>
  );
};

export default Leagues;
