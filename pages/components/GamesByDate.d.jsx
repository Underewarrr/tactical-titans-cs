import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';

const GamesByDate = ({ date }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGamesByDate = async () => {
      try {
        const response = await fetch(`https://api.sportsdata.io/v3/csgo/scores/json/GamesByDate/${date}?key=167bc5b286e24056b6976303d4d9a68a`);
        const data = await response.json();
        setGames(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching games by date:', error);
      }
    };

    fetchGamesByDate();
  }, [date]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }

  return (
    <Card className='main-card-csgo bg-dark'>
      <center>
        <Card.Header>
          <h2>Games on {date}</h2>
        </Card.Header>
      </center>

      {games.length === 0 ? (
        <p>No games found for this date.</p>
      ) : (
        <div className="game-cards">
          {games.map((game) => (
            <Card key={game.GameId} className="game-card bg-dark">
              <Card.Body>
                <Card.Title>Game {game.GameId}</Card.Title>
                <Card.Text>
                  <p>Team A: {game.TeamAName}</p>
                  <p>Team B: {game.TeamBName}</p>
                  {game.Status && <p>Status: {game.Status}</p>}
                  {game.BestOf && <p>Best of: {game.BestOf}</p>}
                  {game.Winner && <p>Winner: {game.Winner}</p>}
                  {game.TeamAScore !== null && <p>Team A Score: {game.TeamAScore}</p>}
                  {game.TeamBScore !== null && <p>Team B Score: {game.TeamBScore}</p>}
                  {game.Updated && <p>Updated: {game.Updated}</p>}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default GamesByDate;
