import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { UserCard } from "../../../card/user-card";
import { RestaurantCardAdmin } from "../../../card/restaurant-card-admin";
import { Text } from "../../../text/text";

import { getRestaurntsByRate } from "../../../../actions/restaurant";
import { useAuth } from "../../../../services/auth.service";
import { PRIVATE_ROUTES } from "../../../../config/routes";

export const AdminRestaurants = () => {
  const auth = useAuth();
  const [restaurants, setRestaurants] = useState([]);

  // ====================
  // Get all restaurants
  // ====================
  const getRestaurantsData = async () => {
    if (auth?.user === null) return;
    const result = await getRestaurntsByRate(0, 0);

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setRestaurants([]);
      return;
    }

    setRestaurants(result.restaurants);
  };

  useEffect(() => {
    getRestaurantsData();
  }, [auth]);

  return (
    <UsersWrapper>
      <TopBar>
        <Text className="large color-orange semi-bold">Restaurants</Text>
        <CreateNewRestaurant
          to={PRIVATE_ROUTES.create + PRIVATE_ROUTES.restaurant}
        >
          Add New
        </CreateNewRestaurant>
      </TopBar>
      <UsersContainer>
        {restaurants.map((restaurant, index) => {
          return (
            <RestaurantCardAdmin
              restaurant={restaurant}
              key={index}
              restaurantDeleted={() => getRestaurantsData()}
            />
          );
        })}
      </UsersContainer>
    </UsersWrapper>
  );
};

const UsersWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  margin-top: 20px;
`;

const UsersContainer = styled.div`
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

const CreateNewRestaurant = styled(Link)`
  text-decoration: none;

  width: 150px;
  height: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background-color: ${(props) => props.theme.orange};
  color: ${(props) => props.theme.orangeAlt};
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 8px;
`;
