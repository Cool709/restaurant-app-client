import styled from "styled-components";
import { Container } from "../components/global/container";
import { Text } from "../components/text/text";

export const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <ContentWrapper>
          <Text className="color-white">&copy; 2022 Restaurant Rating App</Text>
        </ContentWrapper>
      </Container>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 50px;

  background-color: ${(props) => props.theme.black};
`;

const ContentWrapper = styled.div`
  padding: 12px 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;
