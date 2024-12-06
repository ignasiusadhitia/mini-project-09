import useSWR from 'swr';

import portfoliosServices from '@/services/portfoliosServices';
import testimonialsServices from '@/services/testimonialsServices';
import { Footer } from '@components/front';

const HomePage = () => {
  // eslint-disable-next-line
  const { data, error, isLoading } = useSWR('/portfolios', () =>
    portfoliosServices.fetchAllPortofoliosFront()
  );

  const {
    data: testimonials,
    // eslint-disable-next-line
    error: testimonialsError,
    // eslint-disable-next-line
    isLoading: testimonialsIsLoading,
  } = useSWR('/portfolios', () => testimonialsServices.fetchAllTestimonials());
  console.log(data);

  console.log('testimonials', testimonials);
  return <main>HomePage</main>;
};

export default HomePage;
