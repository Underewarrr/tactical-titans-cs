import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import Loading from 'react-loading';

const RoundInfo = ({ gameId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoundInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.sportsdata.io/v3/csgo/stats/json/BoxScore/${gameId}?key=167bc5b286e24056b6976303d4d9a68a`
        );
        setData(response.data);
        setLoading(false);
        console.log('ALO',response.data)
      } catch (error) {
        console.error('Error fetching round info:', error);
      }
    };

    fetchRoundInfo();
  }, [gameId]);

  if (loading) {
    return <Loading type="spin" color="#000" />;
  }

  if (!data) {
    return <p>No round information available.</p>;
  }

  return (
    <Card className="bg-dark text-white">
      <Card.Body>
        <Card.Title>Round Information</Card.Title>
        <ListGroup>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Game ID:</strong> {data.Game.GameId}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Round ID:</strong> {data.Game.RoundId}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Season:</strong> {data.Game.Season}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Season Type:</strong> {data.Game.SeasonType}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Winner:</strong> {data.Game.Winner}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Team A:</strong> {data.Game.TeamAName}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Team A Score:</strong> {data.Game.TeamAScore}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Team B:</strong> {data.Game.TeamBName}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            <strong>Team B Score:</strong> {data.Game.TeamBScore}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default RoundInfo;
