import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { Hamburger, Logo } from '@/assets/icons';

const navLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name: 'Blogs',
    path: '/blogs',
  },
];

const NavLink = ({ link, onNavMenuClick }) => {
  const location = useLocation();

  return (
    <Link
      className={`hover:font-bold ${location.pathname === link.path ? 'font-bold' : ''}`}
      to={link.path}
      onClick={onNavMenuClick}
    >
      <li className="text- py-3 text-center">{link.name}</li>
    </Link>
  );
};

NavLink.propTypes = {
  link: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  onNavMenuClick: PropTypes.func.isRequired,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full ${isScrolled ? 'bg-front-primary opacity-95 shadow-sm' : ''}`}
    >
      <nav className="mx-auto flex max-w-[1359px] items-center justify-between py-11">
        <Logo className="h-7 cursor-pointer text-white" />
        <div className="relative">
          {isOpen && (
            <ul className="absolute right-[66px] mt-[66px] w-[214px] bg-front-white uppercase">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  link={link}
                  onNavMenuClick={toggleNavbar}
                />
              ))}
            </ul>
          )}
          <Hamburger className="cursor-pointer" onClick={toggleNavbar} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
