import styled from "styled-components";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { RestaurantCard } from "../../card/restaurant-card";
import { Text } from "../../text/text";

import { getRestaurantsByOwner } from "../../../actions/restaurant";
import { useAuth } from "../../../services/auth.service";

// ====================
// Restaurant container by owner
// ====================
export const RestaurantsByOwner = () => {
  const auth = useAuth();
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurantData = async () => {
    if (auth?.user === null) return;
    const result = await getRestaurantsByOwner(String(auth?.user._id));

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setRestaurants([]);
      return;
    }

    setRestaurants(result.restaurants);
  };

  useEffect(() => {
    getRestaurantData();
  }, [auth]);

  return (
    <RestaurantsWrapper>
      <Text className="large color-orange semi-bold">MY Restaurants</Text>
      <RestaurantContainer>
        {restaurants.map((restaurant, index) => {
          return <RestaurantCard restaurant={restaurant} key={index} />;
        })}
      </RestaurantContainer>
    </RestaurantsWrapper>
  );
};

const RestaurantsWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  margin-top: 20px;
`;

const RestaurantContainer = styled.div`
  width: 95%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 12px;
  margin-bottom: 20px;
`;
