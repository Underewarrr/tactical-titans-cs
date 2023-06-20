import React, { useEffect, useState } from 'react';
import ESLOne from './ESLOne';
import axios from 'axios';

const CurrentLeagues = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          'https://api.sportsdata.io/v3/csgo/scores/json/Competitions?key=167bc5b286e24056b6976303d4d9a68a'
        );
        setCompetitions(response.data);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="league">Select a league:</label>
        <select id="league" value={selectedLeague} onChange={handleLeagueChange}>
          <option value="">Select</option>
          {competitions.map((competition) => (
            <option key={competition.CompetitionId} value={competition.CompetitionId}>
              {competition.Name}
            </option>
          ))}
        </select>
      </div>
      {selectedLeague && <ESLOne league={selectedLeague} />}
    </div>
  );
};

export default CurrentLeagues;
