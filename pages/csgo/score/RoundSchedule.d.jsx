import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoundSchedule = ({ roundId }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          `https://api.sportsdata.io/v3/csgo/scores/json/Schedule/${roundId}?key=167bc5b286e24056b6976303d4d9a68a`
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
    return <p>Loading standings...</p>;
  }

  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  // Render standings data
  return (
    <div>
      <h2>Round Schedule</h2>
      <ul>
        {standings.map((standing) => (
          <li key={standing.GameId}>
            {standing.TeamAName} {standing.TeamAScore} - {standing.TeamBName} {standing.TeamBScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundSchedule;
