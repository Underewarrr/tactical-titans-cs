import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const CompetitionGames = ({ games, handleRoundClick }) => {
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
                  onClick={() => handleRoundClick(game.RoundId)}
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
