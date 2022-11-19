import styled from "styled-components";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import { Text } from "../text/text";

import { APIs } from "../../config/general";
import { PRIVATE_ROUTES } from "../../config/routes";

interface RestaurantCardProps {
  restaurant: any;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <RestaurantCardWrapper to={`${PRIVATE_ROUTES.detail}/${restaurant._id}`}>
      <RestaurantImage
        src={
          APIs.RESTAURANT_IMAGE_API +
          (restaurant.image === undefined ? "no-image" : restaurant.image)
        }
        alt="restaurant"
      />
      <RestaurantContent>
        <Text className="medium bold">Restaurant</Text>
        <Text className="base">
          {restaurant.description.slice(0, 60)}
          {restaurant.description.length > 60 && "..."}
        </Text>
        <Rating initialValue={restaurant.normalRate} size={25} readonly />
      </RestaurantContent>
    </RestaurantCardWrapper>
  );
};

const RestaurantCardWrapper = styled(Link)`
  width: 400px;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;

  text-decoration: none;

  color: ${(props) => props.theme.base};

  cursor: pointer;

  gap: 8px;

  background-color: ${(props) => props.theme.white};

  box-shadow: 0px 4px 80px rgba(255, 159, 13, 0.15);

  @media (max-width: 425px) {
    width: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const RestaurantImage = styled.img`
  width: 100px;
  height: 100px;

  border-radius: 6px;
`;

const RestaurantContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  gap: 4px;

  padding: 12px;
  padding-right: 14px;

  @media (max-width: 425px) {
    text-align: center;
  }
`;
