import React from 'react';

import PropTypes from 'prop-types';

const Typography = ({ variant, color, className, children }) => {
  const variants = {
    header: {
      tag: 'h1',
      classes: 'font-bold text-100 leading-[1.1] tracking-[0]',
    },
    subHeading: {
      tag: 'h2',
      classes: 'font-bold text-44 leading-auto tracking-[0]',
    },
    largeText: {
      tag: 'p',
      classes: 'font-bold text-350 leading-[2.12] tracking-[0]',
    },
    footerText: {
      tag: 'p',
      classes: 'font-normal text-24 leading-auto tracking-[0]',
    },
    footerTitle: {
      tag: 'h3',
      classes: 'font-bold text-24 leading-auto tracking-[0]',
    },
    blogCardTitle: {
      tag: 'h3',
      classes: 'font-bold text-24 leading-auto tracking-[-2]',
    },
    blogCardText: {
      tag: 'p',
      classes: 'font-normal text-17 leading-auto tracking-[0]',
    },
    blogCardReadMore: {
      tag: 'a',
      classes: 'font-bold text-16 leading-auto tracking-[0]',
    },
    titleTrust: {
      tag: 'h1',
      classes: 'font-bold text-60 leading-auto tracking-[0]',
    },
    trustText: {
      tag: 'p',
      classes: 'font-normal text-28 leading-auto tracking-[0]',
    },
  };

  const { tag: Tag, classes } = variants[variant] || {};
  const baseClasses = `${classes} ${color || ''} ${className || ''}`;

  return Tag ? <Tag className={baseClasses}>{children}</Tag> : null;
};

Typography.propTypes = {
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
