import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import Loading from 'react-loading';

const CompetitionTeams = ({ teams, loading }) => {
  if (loading) {
    return <Loading type="spin" color="#000" />;
  }

  return (
    <Card className="bg-dark text-white">
      <Card.Body>
        <Card.Title>Teams:</Card.Title>
        {(teams ?? []).length > 0 ? (
          <ListGroup>
            {teams.map((team) => (
              <ListGroup.Item
                className="bg-dark text-white"
                key={team.TeamId}
              >
                {team.TeamName}
                <Button variant="primary" size="sm" className="ml-2">
                  View Team
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No teams available.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default CompetitionTeams;
