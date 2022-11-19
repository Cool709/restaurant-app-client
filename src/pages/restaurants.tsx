import styled from "styled-components";
import { useState } from "react";

import { BlankContainer } from "../components/container/blank-container";

import { OwnerSideBar } from "../components/page-elements/owner/sidebar";
import { RestaurantsByOwner } from "../components/page-elements/owner/restaurants-by-owner";
import { CreateRestaurantForm } from "../components/page-elements/owner/create-restaurant";
import { ReplyWaitList } from "../components/page-elements/owner/reply-wait-list";
import { OWNER_PSTATE } from "../types/states";

export const Restaurants = () => {
  const [pstate, setPState] = useState(OWNER_PSTATE.restaurants);

  return (
    <RestaurantsWrapper>
      <BlankContainer>
        <ContentWrapper>
          <SideContentWrapper>
            <OwnerSideBar changeState={(value) => setPState(value)} />
          </SideContentWrapper>
          <ContentDetailWrapper>
            {pstate === OWNER_PSTATE.restaurants && <RestaurantsByOwner />}
            {pstate === OWNER_PSTATE.create && (
              <CreateRestaurantForm changeState={(value) => setPState(value)} />
            )}
            {pstate === OWNER_PSTATE.reply && <ReplyWaitList />}
          </ContentDetailWrapper>
        </ContentWrapper>
      </BlankContainer>
    </RestaurantsWrapper>
  );
};

const RestaurantsWrapper = styled.div`
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
  flex-direction: row;
  align-items: flex-start;

  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SideContentWrapper = styled.div`
  width: 300px;

  margin: 16px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 12px;
  flex-wrap: wrap;

  padding: 50px 20px 50px 20px;

  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};

  border: none;
  border-radius: 8px;
`;

const ContentDetailWrapper = styled.div`
  width: 100%;

  margin: 0px 20px;

  @media (max-width: 768px) {
    margin: 0px;
  }
`;
