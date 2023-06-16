import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import Loading from 'react-loading';

const CompetitionGames = ({ games, handleRoundClick, loading }) => {
  if (loading) {
    return <Loading type="spin" color="#000" />;
  }

  return (
    <Card className="bg-dark text-white">
      <Card.Body>
        <Card.Title>Games:</Card.Title>
        {games.length > 0 ? (
          <ListGroup>
            {games.map((game) => (
              <ListGroup.Item
                className="bg-dark text-white"
                key={game.GameId}
              >
                {game.TeamAName} vs {game.TeamBName}
                <Button
                  variant="primary"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleRoundClick(game.RoundId, game.GameId)}
                >
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
  );
};

export default CompetitionGames;
