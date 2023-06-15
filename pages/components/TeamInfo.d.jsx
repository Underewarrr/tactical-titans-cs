import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const TeamInfo = ({ team }) => {
  return (
    <Accordion>
      <Card className="bg-dark">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <h4>{team.Name}</h4>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <p>Country: {team.AreaName}</p>
            <h5>Players:</h5>
            {team.Players.map(player => (
              player.MatchName && (
                <div key={player.PlayerId}>
                  <p>Name: {player.FirstName} {player.LastName}</p>
                  <p>Common Name: {player.CommonName}</p>
                  <p>Match Name: {player.MatchName}</p>
                  <p>Birth Date: {player.BirthDate}</p>
                  <p>Birth Country: {player.BirthCountry}</p>
                  <p>Nationality: {player.Nationality}</p>
                </div>
              )
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default TeamInfo;
