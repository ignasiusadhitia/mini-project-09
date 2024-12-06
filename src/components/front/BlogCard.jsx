import React from 'react';

import { Link } from 'react-router-dom';

import { Arrow } from '@/assets/icons';
import { BlogCardImage } from '@/assets/images';
import { Typography } from '@components/commons';

const BlogCard = () => {
  return (
    <div className="cursor-pointer px-[25px] pb-[31px] pt-[25px] shadow">
      {/* Image */}
      <img
        alt="blog-card-image"
        className="h-[353px] w-full object-cover"
        src={BlogCardImage}
      />
      {/* Title */}
      <Typography className="mt-[34px]" variant="blogCardTitle">
        Building a stronger brand with no-code tools
      </Typography>

      <p className="mt-[14px] opacity-50">
        Learn about taking on a content design mindset from an expert in brand
        strategy and content design.
      </p>

      <Link className="mt-[21px] flex items-center gap-[13px]" to="#">
        <span className="uppercase">read more</span>
        <Arrow />
      </Link>
    </div>
  );
};

export default BlogCard;
