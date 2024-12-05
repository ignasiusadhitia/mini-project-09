import React from 'react';

import useSWR from 'swr';

import blogsServices from '@/services/blogsServices';

const BlogList = () => {
  // eslint-disable-next-line
  const { data, error, isLoading } = useSWR('/blogs', () =>
    blogsServices.fetchAllArticlesFront()
  );
  console.log(data);
  return <div>BlogList</div>;
};

export default BlogList;
