import React from 'react';

import {
  Clients1,
  Clients2,
  Clients3,
  Clients4,
  Clients5,
  Clients6,
  Clients7,
  Clients8,
} from '@/assets/images';
import { Typography } from '@components/commons';

const clients = [
  {
    label: 'spotify',
    path: Clients1,
  },
  {
    label: 'dropbox',
    path: Clients2,
  },
  {
    label: 'tesla',
    path: Clients3,
  },
  {
    label: 'reddit',
    path: Clients4,
  },
  {
    label: 'google',
    logo: Clients5,
  },
  {
    label: 'stripe',
    logo: Clients6,
  },
  {
    label: 'dhl',
    logo: Clients7,
  },
  {
    label: 'airbnb',
    logo: Clients8,
  },
];

const PastClientsSection = () => {
  return (
    <div>
      <section className="mx-auto max-w-[1272px] pb-[214px] pt-[224px]">
        {/* Heading */}
        <Typography variant="subHeading">
          We worked with the world’s biggest brands and the most innovative
          startups
        </Typography>

        {/* Clients */}
        <div className="grid grid-cols-4">
          {clients.map((client) => (
            <img
              key={client.label}
              alt={`${client.label}-logo`}
              src={client.path}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PastClientsSection;
