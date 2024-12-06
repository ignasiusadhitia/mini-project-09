import { BGHeader, TwoHands } from '@/assets/vectors';

const Header = () => {
  return (
    <header className="h-screen overflow-hidden bg-front-primary pb-8">
      {/* 
      <Typography variant="headerText">{text}</Typography>
      */}

      {/* Illustration */}

      <div className="relative h-screen overflow-hidden">
        <BGHeader className="relative mx-auto pb-[30px]" height="100%" />
        <TwoHands
          className="absolute bottom-0 mb-[-155px] overflow-hidden"
          width="100%"
        />
      </div>
    </header>
  );
};

export default Header;
