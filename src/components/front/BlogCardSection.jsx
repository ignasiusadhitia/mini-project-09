import React from 'react';

import { Link } from 'react-router-dom';

import { Typography } from '@/components/commons';
import { BlogCard } from '@components/front';

const BlogCardSection = () => {
  return (
    <>
      <section className="mx-auto mb-[194px] mt-[154px] max-w-[1321px]">
        <div className="mb-[93px] flex items-center justify-between">
          <Typography className="ml-[94px]" variant="subHeading">
            Check out our interesting articles
          </Typography>

          <Link to="/blog">
            <Typography
              as="span"
              className="border-b-2 border-front-black font-bold uppercase"
            >
              see all
            </Typography>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-x-[80px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <BlogCard key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogCardSection;
