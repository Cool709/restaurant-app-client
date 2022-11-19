import styled from "styled-components";

import { BlankContainer } from "../components/container/blank-container";
import { ExploreRestaurants } from "../components/page-elements/explore/restaurants";

export const Home = () => {
  return (
    <HomeWrapper>
      <BlankContainer>
        <ContentWrapper>
          <ExploreRestaurants />
        </ContentWrapper>
      </BlankContainer>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 134px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 134px);

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
`;
