import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import Loading from 'react-loading';
import CompetitionTeams from '../csgo/score/CompetitionTeams.d';
//import CompetitionGames from '../csgo/score/CompetitionGames.d';
import RoundStandings from '../csgo/score/RoundStandings.d';
import RoundSchedule from '../csgo/score/RoundSchedule.d';
import BoxScore from '../csgo/score/BoxScore.d';

const ESLOneFixtures = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [selectedGameId, setSelectedGameId] = useState(null);

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
    return <center><Loading type="spin" color="#de9b35" /></center>;
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

  const handleRoundClick = (roundId, gameId) => {
    setSelectedRoundId(roundId);
    setSelectedGameId(gameId);
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
          {selectedGameId && <BoxScore gameId={selectedGameId} />}
        </Col>

        <Col>
          <CompetitionTeams teams={shuffledTeams} />
        </Col>
        <Col>
          <CompetitionGames
            games={filteredGames}
            handleRoundClick={handleRoundClick}
          />
        </Col>
      </Row>

      {selectedRoundId && (
        <>
        <Container>
          <RoundStandings className="col-xs-6 col-md-4" roundId={selectedRoundId} />
          <RoundSchedule className="col-xs-6 col-md-4" roundId={selectedRoundId} />
        </Container>
          
        </>
      )}
    </Card>
  );
};

export default ESLOneFixtures;
