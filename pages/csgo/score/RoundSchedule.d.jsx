import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'react-loading';

const RoundSchedule = ({ roundId }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `https://api.sportsdata.io/v3/csgo/scores/json/Schedule/${roundId}?key=167bc5b286e24056b6976303d4d9a68a`
        );
        setSchedule(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [roundId]);

  if (loading) {
    return <Loading type="spin" color="#de9b35" />;
  }

  if (!schedule || schedule.length === 0) {
    return <p>No schedule available.</p>;
  }

  // Render schedule data
  return (
    <div>
      <h2>Round Schedule</h2>
      <ul>
        {schedule.map((game) => (
          <li key={game.GameId}>
            {game.TeamAName} {game.TeamAScore} - {game.TeamBName} {game.TeamBScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundSchedule;
