import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'react-bootstrap';
import GamesByDate from './GamesByDate.d';

const Competition = ({ onLeagueSelect }) => {
  const [scores, setScores] = useState([]);
  const [lastDate, setLastDate] = useState(null);
  //const resultRef = useRef(null);

  useEffect(() => {
    fetch('https://api.sportsdata.io/v3/csgo/scores/json/Competitions?key=167bc5b286e24056b6976303d4d9a68a')
      .then(response => response.json())
      .then(data => setScores(data));
  }, []);

  const handleLeagueClick = (competitionId) => {
    const league = scores.find(competition => competition.CompetitionId === competitionId);
    if (league && league.Seasons.length > 0) {
      const lastSeason = league.Seasons[league.Seasons.length - 1];
      const endDate = new Date(lastSeason.EndDate).toISOString().split('T')[0];
      setLastDate(endDate);
    }
    onLeagueSelect(competitionId);
    //resultRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
        {/* <div ref={resultRef} /> */}
      </Card>
      {lastDate && <GamesByDate date={lastDate} />}
    </div>
  );
};

export default Competition;
