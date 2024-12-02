import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
  Clients,
  Login,
  Overview,
  Portfolio,
  Register,
  Teams,
  Testimonials,
  Trusts,
  WhoWeAre,
  ContactUs as AdminContactUs,
} from '@pages/admin';
import { AboutUs, ContactUs, HomePage, OurWorks } from '@pages/guests';

import { NotFound } from '@pages';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Guests Routes */}
        <Route element={<HomePage />} path="/" />
        <Route element={<OurWorks />} path="/our-works" />
        <Route element={<AboutUs />} path="/about-us" />
        <Route element={<ContactUs />} path="/contact" />

        {/* Auth Routes */}
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />

        {/* Admin Routes (Protected) */}
        <Route element={<Overview />} path="/dashboard" />
        <Route element={<Portfolio />} path="/dashboard/portfolio" />
        <Route element={<Testimonials />} path="/dashboard/testimonials" />
        <Route element={<Clients />} path="/dashboard/clients" />
        <Route element={<WhoWeAre />} path="/dashboard/who-we-are" />
        <Route element={<Teams />} path="/dashboard/teams" />
        <Route element={<Trusts />} path="/dashboard/trusts" />
        <Route element={<AdminContactUs />} path="/dashboard/contact-us" />

        {/* Fallback Route */}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
};

export default App;
