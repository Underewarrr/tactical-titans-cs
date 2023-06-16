import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Loading from 'react-loading';

const RoundStandings = ({ roundId }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          `https://api.sportsdata.io/v3/csgo/scores/json/Standings/${roundId}?key=167bc5b286e24056b6976303d4d9a68a`
        );
        setStandings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    fetchStandings();
  }, [roundId]);

  if (loading) {
    return <Loading type="spin" color="#de9b35" />;
  }

  // Render standings data
  return (
    <Card className="bg-dark text-white">
      <Card.Header>
        <center>
          <h2>Round Standings</h2>
        </center>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <ul>
            {standings.map((standing) => (
              <li key={standing.StandingId}>
                {standing.Name} - Points: {standing.Points}
              </li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RoundStandings;
