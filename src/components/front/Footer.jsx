import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography } from '@components/commons';

import { Email, Facebook, Google, Logo, Twitter } from '@icons';

const whatWeDoLinks = [
  {
    label: 'Intro',
    path: '#',
  },
  {
    label: 'Home',
    path: '#',
  },
  {
    label: 'Work',
    path: '#',
  },
  {
    label: 'Pricing',
    path: '#',
  },
  {
    label: 'Contact Us',
    path: '#',
  },
];

const whoWeAreLinks = [
  { label: 'About', path: '#' },
  { label: 'News', path: '#' },
  { label: 'Testimonials', path: '#' },
];

const tocLinks = [
  { label: 'Privacy Policy', path: '#' },
  { label: 'Terms', path: '#' },
];

const socialsLinks = [
  {
    label: 'twitter',
    icon: <Twitter />,
    path: 'https://x.com',
    type: 'external',
  },
  {
    label: 'facebook',
    icon: <Facebook />,
    path: 'https://facebook.com',
    type: 'external',
  },
  {
    label: 'google',
    icon: <Google />,
    path: 'https://plus.google.com',
    type: 'external',
  },
];

const FooterLink = ({ link }) => (
  <li>
    <Link
      rel={link.type === 'external' ? 'noopener noreferrer' : ''}
      target={link.type === 'external' ? '_blank' : ''}
      to={link.path}
    >
      {link.icon && link.icon}

      <Typography variant="footerText">
        {link.icon ? '' : link.label}
      </Typography>
    </Link>
  </li>
);

FooterLink.propTypes = {
  link: PropTypes.shape({
    icon: PropTypes.element,
    path: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
  }),
};

const Footer = () => {
  return (
    <div className="mt-[70px] bg-black">
      <footer className="mx-auto max-w-[1525px] pb-14 pt-28 text-white">
        <section className="grid grid-cols-2 gap-[198px]">
          {/* Footer Top Left Section */}
          <div className="flex flex-col">
            {/* dsgnr. Logo */}
            <Logo />

            {/* Description */}
            <Typography
              className="mb-[75px] mt-[61px] max-w-[599px]"
              variant="footerText"
            >
              Dsgnr. is an award winning creative and design agency based in New
              York, USA.
            </Typography>

            {/* Email Us */}
            <button className="mr-[181px] flex items-center gap-[110px] border-2 border-front-primary py-[25px] pl-[35px]">
              <Email />
              <Typography variant="footerText">info@dsgnr.com</Typography>
            </button>
          </div>

          {/* Information  */}
          <div className="mt-[19px] flex gap-27.5">
            {/* What We Do */}
            <div>
              <Typography variant="footerTitle">What We Do</Typography>
              <ul>
                {whatWeDoLinks.map((item) => (
                  <FooterLink key={item.label} link={item} />
                ))}
              </ul>
            </div>

            {/* Who We Are */}
            <div>
              <Typography variant="footerTitle">Who We Are</Typography>
              <ul>
                {whoWeAreLinks.map((item) => (
                  <FooterLink key={item.label} link={item} />
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="mb-[24px] mt-[100px]">
          {/* TOC and Socials Section */}
          <nav className="flex justify-between">
            {/* TOC */}
            <ul className="flex gap-16">
              {tocLinks.map((item) => (
                <FooterLink key={item.label} link={item} />
              ))}
            </ul>

            {/* Socials */}
            <ul className="flex gap-12">
              {socialsLinks.map((item, index) => (
                <FooterLink key={index} link={item} />
              ))}
            </ul>
          </nav>

          {/* Credits */}
          <Typography className="text-center opacity-20" variant="footerText">
            Made with ❤️{' '}
            <a
              href="https://moyin.gumroad.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              by moyin
            </a>
          </Typography>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
