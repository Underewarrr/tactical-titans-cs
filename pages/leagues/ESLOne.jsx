import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import Loading from 'react-loading';
import RoundStandings from '../components/RoundStandings.d';
import RoundInfo from '../components/RoundInfo.d';

const ESLOneFixtures = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoundId, setSelectedRoundId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.sportsdata.io/v3/csgo/scores/json/CompetitionDetails/100000010?key=167bc5b286e24056b6976303d4d9a68a'
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading type="spin" color="#000" />;
  }

  const shuffledTeams = shuffleArray(data.Teams).slice(0, 7);
  const shuffledGames = shuffleArray(data.Games).slice(0, 7);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const uniqueGames = [];
  const filteredGames = shuffledGames.filter((game) => {
    if (!uniqueGames.includes(game.GameId)) {
      uniqueGames.push(game.GameId);
      return true;
    }
    return false;
  });

  const handleRoundClick = (roundId) => {
    setSelectedRoundId(roundId);
  };

  return (
    <Card className="bg-dark text-white">
      <Row>
        <Col>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>ESL One Fixtures</Card.Title>
              <Card.Text>
                <ListGroup>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Competition ID:</strong> {data.CompetitionId}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Area ID:</strong> {data.AreaId}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Area Name:</strong> {data.AreaName}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Gender:</strong> {data.Gender}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Type:</strong> {data.Type}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Format:</strong> {data.Format}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-white">
                    <strong>Player Stats Coverage:</strong>{' '}
                    {data.PlayerStatsCoverage ? 'Yes' : 'No'}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>Teams:</Card.Title>
              <ListGroup>
                {shuffledTeams.map((team) => (
                  <ListGroup.Item className="bg-dark text-white" key={team.TeamId}>
                    {team.Name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>Games:</Card.Title>
              {filteredGames.length > 0 ? (
                <ListGroup>
                  {filteredGames.map((game) => (
                    <ListGroup.Item className="bg-dark text-white" key={game.GameId}>
                      {game.TeamAName} vs {game.TeamBName}
                      <Button variant="primary" size="sm" className="ml-2" onClick={() => handleRoundClick(game.RoundId)}>
                        Round {game.RoundId}
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No games available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedRoundId && (
        <><RoundInfo roundId={selectedRoundId} /><RoundStandings roundId={selectedRoundId} /></>
      )}
    </Card>
  );
};

export default ESLOneFixtures;
