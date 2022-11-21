import styled from "styled-components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { BlankContainer } from "../../components/container/blank-container";

import { getRestaurantById } from "../../actions/restaurant";
import { UpdateRestaurantForm } from "../../components/page-elements/admin/restaurants/update";

// ====================
// Update restaurant page
// ====================
export const UpdateRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  // ====================
  // Get all restaurants
  // ====================
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
    <CreateUserWrapper>
      <BlankContainer>
        <ContentWrapper>
          {restaurant !== null && (
            <UpdateRestaurantForm restaurant={restaurant} />
          )}
        </ContentWrapper>
      </BlankContainer>
    </CreateUserWrapper>
  );
};

const CreateUserWrapper = styled.div`
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
