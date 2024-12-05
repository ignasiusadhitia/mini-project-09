import React from 'react';

import useSWR from 'swr';

import teamsServices from '@/services/teamsServices';

const AboutUs = () => {
  const queryParams = {
    usernames: ['adnabirnir', 'ignasiusadhitia'],
  };
  const {
    data: teams,
    // eslint-disable-next-line
    error,
    // eslint-disable-next-line
    isLoading,
    // eslint-disable-next-line
  } = useSWR(['/teams', queryParams], ([url, params]) =>
    teamsServices.fetchAllTeams(params)
  );

  console.log(teams);
  return <div>AboutUs</div>;
};

export default AboutUs;
