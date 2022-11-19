import styled from "styled-components";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Text = ({ children, className }: TextProps) => {
  return <TextWrapper className={className}>{children}</TextWrapper>;
};

const TextWrapper = styled.p`
  margin: 0;
  padding: 0;

  max-width: 1440px;
`;
