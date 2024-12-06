import { LogoBig } from '@/assets/icons';
import { ThreeHands } from '@/assets/images';
import { Typography } from '@components/commons';

const CTASection = () => {
  return (
    <section className="grid grid-cols-3 overflow-hidden bg-front-primary pt-[70px]">
      <div className="mt-[-10px]">
        {/* Logo */}
        <LogoBig />
      </div>

      {/* Heading */}
      <Typography className="max-w-[468px]" variant="subHeading">
        Grow Your Business. Build Great Products.
      </Typography>

      <div className="flex h-full flex-col">
        {/* CTA Button */}
        <button className="w-fit bg-front-black px-[54px] py-[25px] font-semibold text-white">
          Book a free call
        </button>

        <div className="flex w-full justify-end">
          {/* Hands Illustration */}
          <img alt="three-hands-illustration" src={ThreeHands} />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
