import PropTypes from 'prop-types';

import { TwoHands } from '@/assets/vectors';
import { Typography } from '@components/commons';

const Header = ({ text }) => {
  return (
    <header className="h-screen overflow-hidden bg-front-primary pb-8">
      <Typography variant="headerText">{text}</Typography>

      {/* Illustration */}
      <TwoHands className="bottom-0 object-cover" width="100%" />
    </header>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
