import styled from "styled-components";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Title = ({ children, className }: TextProps) => {
  return <TitleWrapper className={className}>{children}</TitleWrapper>;
};

const TitleWrapper = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 14px;
  margin-bottom: 16px;

  font-size: 40px;
  font-weight: 700;
  font-family: "Barlow", sans-serif;

  text-align: center;

  max-width: 1440px;

  color: ${(props) => props.theme.orange};

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
