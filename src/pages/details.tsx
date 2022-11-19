import styled from "styled-components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { BlankContainer } from "../components/container/blank-container";

import { getRestaurantById } from "../actions/restaurant";
import { RestaurantDetail } from "../components/page-elements/detail/restaurant-detail";
import { Comments } from "../components/page-elements/detail/comments";
import { LeaveCommentButton } from "./../components/page-elements/detail/leave-comment-button";

export const Details = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const getRestaurantData = async () => {
    const result = await getRestaurantById(String(id));

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setRestaurant(null);
      return;
    }

    setRestaurant(result.restaurant);
  };

  useEffect(() => {
    getRestaurantData();
  });

  return (
    <DetailsWrapper>
      <BlankContainer>
        <ContentWrapper>
          {restaurant !== null && (
            <RestaurantDetail restaurant={restaurant}>
              <LeaveCommentButton restaurant={restaurant} />
            </RestaurantDetail>
          )}
          {restaurant !== null && (
            <Comments comments={(restaurant as any).comments} />
          )}
        </ContentWrapper>
      </BlankContainer>
    </DetailsWrapper>
  );
};

const DetailsWrapper = styled.div`
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
