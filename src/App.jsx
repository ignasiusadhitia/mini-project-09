import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import FrontLayout from '@/layouts/FrontLayout';
import ProtectedLayout from '@layouts/ProtectedLayout';
import {
  ContactUs as AdminContactUs,
  Blogs,
  BlogsForm,
  Login,
  Overview,
  Portfolios,
  PortfoliosForm,
  Profile,
  Testimonials,
  TestimonialsForm,
  Users,
  UsersForm,
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
            <Route element={<FrontLayout />} path="/">
              <Route index element={<HomePage />} />
              <Route element={<OurWorks />} path="our-works" />
              <Route element={<Article />} path="our-works/:id" />
              <Route element={<AboutUs />} path="about-us" />
              <Route element={<ContactUs />} path="contact" />
              <Route element={<BlogList />} path="blog" />
              <Route element={<Article />} path="blog/:slug" />
              {/* Fallback Route */}
              <Route element={<NotFound />} path="*" />
            </Route>

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
            <Route element={<Portfolios />} path="portfolios" />
            <Route element={<PortfoliosForm />} path="portfolios/add" />
            <Route
              element={<PortfoliosForm isEdit />}
              path="portfolios/edit/:id"
            />
            <Route element={<Testimonials />} path="testimonials" />
            <Route element={<TestimonialsForm />} path="testimonials/add" />
            <Route
              element={<TestimonialsForm isEdit />}
              path="testimonials/edit/:id"
            />
            <Route element={<AdminContactUs />} path="contact-us" />
            <Route element={<Profile />} path="profile" />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
