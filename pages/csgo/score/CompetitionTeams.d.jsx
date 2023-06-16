import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CompetitionTeams = ({ teams }) => {
  return (
    <Card className="bg-dark text-white">
      <Card.Body>
        <Card.Title>Teams:</Card.Title>
        <ListGroup>
          {teams.map((team) => (
            <ListGroup.Item
              className="bg-dark text-white"
              key={team.TeamId}
            >
              {team.Name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CompetitionTeams;
