import React from 'react';

import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import ProtectedLayout from '@layouts/ProtectedLayout';
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
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route element={<Navigate to="/dashboard" />} path="*" />
        ) : (
          <>
            {/* Guests Routes */}
            <Route element={<HomePage />} path="/" />
            <Route element={<OurWorks />} path="/our-works" />
            <Route element={<AboutUs />} path="/about-us" />
            <Route element={<ContactUs />} path="/contact" />

            {/* Auth Routes */}
            {!isAuthenticated && (
              <>
                <Route element={<Register />} path="/register" />
                <Route element={<Login />} path="/login" />
              </>
            )}
          </>
        )}

        {/* Admin Routes (Protected) */}
        {isAuthenticated && (
          <Route
            element={<ProtectedLayout isAuthenticated={isAuthenticated} />}
            path="/dashboard"
          >
            <Route index element={<Overview />} />
            <Route element={<Portfolio />} path="portfolio" />
            <Route element={<Testimonials />} path="testimonials" />
            <Route element={<Clients />} path="clients" />
            <Route element={<WhoWeAre />} path="who-we-are" />
            <Route element={<Teams />} path="teams" />
            <Route element={<Trusts />} path="trusts" />
            <Route element={<AdminContactUs />} path="contact-us" />
          </Route>
        )}

        {/* Fallback Route */}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
};

export default App;
