import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Loading from 'react-loading';

const BoxScore = ({ gameId }) => {
  const [boxScoreData, setBoxScoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.sportsdata.io/v3/csgo/stats/json/BoxScore/${gameId}?key=167bc5b286e24056b6976303d4d9a68a`)
      .then(response => response.json())
      .then(data => {
        console.log('Box Score Data:', data);
        setBoxScoreData(data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching box score:', error);
        setLoading(false);
      });
  }, [gameId]);

  if (loading) {
    return (
      <div>
        <Loading type="spin" color="#de9b35" />
        <div>Loading box score...</div>
      </div>
    );
  }

  console.log('Box Score Data:', boxScoreData);

  if (!boxScoreData) {
    return <div>No box score data available.</div>;
  }

  const {
    GameId,
    Season,
    TeamAName,
    TeamAScore,
    TeamBName,
    TeamBScore
  } = boxScoreData.Game;

  return (
    <Card className="bg-dark text-white">
      <Card.Header>
        <center>
        <h2>Box Score</h2>
        </center>
      </Card.Header>
      
    <Card.Body>
      <Card.Text>Game ID: {GameId}</Card.Text>
      <Card.Text>Season: {Season}</Card.Text>
      <Card.Text>Team A: {TeamAName}</Card.Text>
      <Card.Text>Team A Score: {TeamAScore}</Card.Text>
      <Card.Text>Team B: {TeamBName}</Card.Text>
      <Card.Text>Team B Score: {TeamBScore}</Card.Text>
      </Card.Body>
      {/* Additional box score data can be rendered here */}
    </Card>
  );
};

export default BoxScore;
