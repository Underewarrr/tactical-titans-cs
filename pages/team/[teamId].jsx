import React from 'react';
import { useRouter } from 'next/router';
import TeamInfo from '../components/TeamInfo.d';

const TeamPage = () => {
  const router = useRouter();
  const { teamId } = router.query;

  return <TeamInfo teamId={teamId} />;
};

export default TeamPage;
