import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';

const PlayerByTeam = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`https://api.sportsdata.io/v3/csgo/scores/json/PlayersByTeam/${teamId}?key=167bc5b286e24056b6976303d4d9a68a`);
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  return (
    <div>
      {loading ? (
        <ReactLoading type="spin" color="#000" />
      ) : (
        <div>
          {players.length > 0 ? (
            <Card className='main-card-csgo bg-dark'>
              <center><h2>Seletected Team Players Information</h2></center>
              {players.map((player) => (
                <Card key={player.PlayerId} className="mb-3 main-card-csgo bg-dark text-white">
                  <Card.Body>
                    <Card.Title>{player.FirstName} {player.LastName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Common Name: {player.CommonName}</Card.Subtitle>
                    <Card.Text>
                      <p>Match Name: {player.MatchName}</p>
                      <p>Gender: {player.Gender}</p>
                      <p>Birth Date: {player.BirthDate}</p>
                      <p>Birth Country: {player.BirthCountry}</p>
                      <p>Nationality: {player.Nationality}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Card>
          ) : (
            <p>No players found for the specified team.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerByTeam;
