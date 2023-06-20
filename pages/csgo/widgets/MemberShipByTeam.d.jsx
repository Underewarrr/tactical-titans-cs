import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import SideMenubar from '../../components/SideMenu.d';

const MembershipsByTeam = ({ teamId }) => {
  const [memberships, setMemberships] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(`https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/${teamId}?key=167bc5b286e24056b6976303d4d9a68a`);
        const data = await response.json();
        setMemberships(data);
        console.log(teamId);
      } catch (error) {
        console.log('Error fetching memberships:', error);
      }
    };

    if (teamId) {
      fetchMemberships();
    }
  }, [teamId]);

  if (!memberships) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }

  return (
    <><SideMenubar /><Card className="main-card-csgo bg-dark">
          <Card.Header>
              <h2>All Players From Selected Team</h2>
          </Card.Header>
          <Card.Body>
              {memberships.map((membership) => (
                  <div key={membership.MembershipId}>
                      <Card.Title>{membership.TeamName}</Card.Title>
                      <Card.Text>
                          <p>Membership ID: {membership.MembershipId}</p>
                          <p>Team ID: {membership.TeamId}</p>
                          <p>Player ID: {membership.PlayerId}</p>
                          <p>Player Name: {membership.PlayerName}</p>
                          <p>Team Area: {membership.TeamArea}</p>
                          <p>Active: {membership.Active ? 'Yes' : 'No'}</p>
                          <p>Start Date: {membership.StartDate}</p>
                          <p>End Date: {membership.EndDate}</p>
                          <p>Updated: {membership.Updated}</p>
                      </Card.Text>
                  </div>
              ))}
          </Card.Body>
      </Card></>
  );
};

export default MembershipsByTeam;
