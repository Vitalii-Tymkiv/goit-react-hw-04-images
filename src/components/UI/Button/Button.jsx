import PropTypes from 'prop-types';
import { Btn, BtnWrapper } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <BtnWrapper>
      <Btn type="button" onClick={onClick}>
        Load More
      </Btn>
    </BtnWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
