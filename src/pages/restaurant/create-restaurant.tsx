import styled from "styled-components";

import { BlankContainer } from "../../components/container/blank-container";

import { CreateRestaurantForm } from "../../components/page-elements/admin/restaurants/create";

export const CreateRestaurant = () => {
  return (
    <CreateRestaurantWrapper>
      <BlankContainer>
        <ContentWrapper>
          <CreateRestaurantForm />
        </ContentWrapper>
      </BlankContainer>
    </CreateRestaurantWrapper>
  );
};

const CreateRestaurantWrapper = styled.div`
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
