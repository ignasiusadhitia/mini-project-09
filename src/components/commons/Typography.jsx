import React from 'react';

import PropTypes from 'prop-types';

const Typography = ({ as: Tag, variant, color, className, children }) => {
  const variants = {
    header: 'font-bold text-100 leading-[1.1] tracking-[0]',
    subHeading: 'font-bold text-44 leading-auto tracking-[0]',
    largeText: 'font-bold text-350 leading-[2.12] tracking-[0]',
    footerText: 'font-normal text-24 leading-auto tracking-[0]',
    footerTitle: 'font-bold text-24 leading-auto tracking-[0]',
    blogCardTitle: 'font-bold text-24 leading-auto tracking-[-2]',
    blogCardText: 'font-normal text-17 leading-auto tracking-[0]',
    blogCardReadMore: 'font-bold text-16 leading-auto tracking-[0]',
    titleTrust: 'font-bold text-60 leading-auto tracking-[0]',
    trustText: 'font-normal text-28 leading-auto tracking-[0]',
  };

  const defaultTags = {
    header: 'h1',
    subHeading: 'h2',
    largeText: 'p',
    footerText: 'p',
    footerTitle: 'h3',
    blogCardTitle: 'h3',
    blogCardText: 'p',
    blogCardReadMore: 'a',
    titleTrust: 'h1',
    trustText: 'p',
  };

  const ComponentTag = Tag || defaultTags[variant] || 'div';
  const baseClasses = `${variants[variant] || ''} ${color || ''} ${className || ''}`;

  return <ComponentTag className={baseClasses}>{children}</ComponentTag>;
};

Typography.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.oneOf([
    'header',
    'subHeading',
    'largeText',
    'footerText',
    'footerTitle',
    'blogCardTitle',
    'blogCardText',
    'blogCardReadMore',
    'titleTrust',
    'trustText',
  ]).isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Typography;
