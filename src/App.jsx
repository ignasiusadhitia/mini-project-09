import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import ProtectedLayout from '@layouts/ProtectedLayout';
import {
  ContactUs as AdminContactUs,
  Blogs,
  BlogsForm,
  Clients,
  Login,
  Overview,
  Portfolio,
  Profile,
  Teams,
  Testimonials,
  Trusts,
  Users,
  UsersForm,
  WhoWeAre,
} from '@pages/dashboard';
import {
  AboutUs,
  Article,
  BlogList,
  ContactUs,
  HomePage,
  OurWorks,
} from '@pages/front';

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
            <Route element={<Article />} path="/our-works/:id" />
            <Route element={<AboutUs />} path="/about-us" />
            <Route element={<ContactUs />} path="/contact" />
            <Route element={<BlogList />} path="/blog" />
            <Route element={<Article />} path="/blog/:id" />

            {/* Auth Routes */}
            {!isAuthenticated && (
              <>
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
            <Route element={<Users />} path="users" />
            <Route element={<UsersForm />} path="users/add" />
            <Route element={<UsersForm isEdit />} path="users/edit/:id" />
            <Route element={<Blogs />} path="blogs" />
            <Route element={<BlogsForm />} path="blogs/add" />
            <Route element={<BlogsForm isEdit />} path="blogs/edit/:id" />
            <Route element={<Portfolio />} path="portfolio" />
            <Route element={<Testimonials />} path="testimonials" />
            <Route element={<Clients />} path="clients" />
            <Route element={<WhoWeAre />} path="who-we-are" />
            <Route element={<Teams />} path="teams" />
            <Route element={<Trusts />} path="trusts" />
            <Route element={<AdminContactUs />} path="messages" />
            <Route element={<Profile />} path="profile" />
          </Route>
        )}

        {/* Fallback Route */}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
};

export default App;
