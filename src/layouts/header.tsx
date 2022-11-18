import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container } from "../components/container/container";

import { LOGO } from "../config/images";
import { Text } from "../components/text/text";
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from "../config/routes";

export const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <ContentWrapper>
          <Logo to={PRIVATE_ROUTES.home} className="large font-chango">
            <img src={LOGO} alt="logo" width="50px" height="60px" />
            <Text>Rating App</Text>
          </Logo>
          <LinkGroup>
            <HeaderLink to={PUBLIC_ROUTES.login}>Sign In</HeaderLink>
            <HeaderLink to={PUBLIC_ROUTES.signup}>Sign up</HeaderLink>
          </LinkGroup>
        </ContentWrapper>
      </Container>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 50px;

  background-color: ${(props) => props.theme.black};
`;

const ContentWrapper = styled.div`
  padding: 12px 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 10px;
`;

const Logo = styled(Link)`
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  color: ${(props) => props.theme.white};

  p {
    transition: all linear 0.3s;
  }

  &:hover {
    p {
      color: ${(props) => props.theme.orange};
    }
  }

  @media (max-width: 425px) {
    p {
      display: none;
    }
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  gap: 12px;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;

  font-weight: 700;
  font-size: 16px;

  color: ${(props) => props.theme.white};

  transition: all linear 0.3s;

  &:hover {
    color: ${(props) => props.theme.orange};
  }
`;
