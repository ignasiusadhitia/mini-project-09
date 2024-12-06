import React from 'react';

import { Outlet } from 'react-router-dom';

import { CTASection, Footer, Header, Navbar } from '@/components/front';

const FrontLayout = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
      <CTASection />
      <Footer />
    </>
  );
};

export default FrontLayout;
