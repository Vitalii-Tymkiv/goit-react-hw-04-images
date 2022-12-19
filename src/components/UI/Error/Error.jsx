import { ErrorText, ErrorWrapper } from './Error.styled';

export const Error = ({ children }) => {
  return (
    <ErrorWrapper>
      <ErrorText>{children}</ErrorText>
    </ErrorWrapper>
  );
};
