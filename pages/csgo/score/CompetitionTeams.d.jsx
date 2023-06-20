import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Loading from 'react-loading';

const CompetitionTeams = ({ teams, loading }) => {
  if (loading) {
    return <Loading type="spin" color="#de9b35" />;
  }

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
