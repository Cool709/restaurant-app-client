import styled from "styled-components";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import { APIs } from "../../../config/general";

interface RestaurantDetailProps {
  restaurant: any;
  children?: React.ReactNode;
}

// ====================
// Restaurant container with detailed information
// ====================
export const RestaurantDetail = ({
  restaurant,
  children,
}: RestaurantDetailProps) => {
  return (
    <RestaurantInfo>
      <RestaurantImage
        src={
          APIs.RESTAURANT_IMAGE_API +
          (restaurant.image === undefined ? "no-image" : restaurant.image)
        }
        alt="restaurant"
      />
      <RestaurantName>{restaurant.name}</RestaurantName>
      <RestaurantDescription>{restaurant.description}</RestaurantDescription>
      <Rating initialValue={restaurant.normalRate} readonly size={25} />
      <>{children}</>
    </RestaurantInfo>
  );
};

const RestaurantInfo = styled.div`
  width: 300px;

  margin: 16px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 12px;
  flex-wrap: wrap;

  padding: 20px 20px 40px 20px;

  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};

  border: none;
  border-radius: 8px;
`;

const RestaurantImage = styled.img`
  width: 250px;

  border: none;
  border-radius: 8px;

  object-fit: cover;
`;

const RestaurantName = styled.p`
  font-size: 24px;
  font-weight: 600;

  margin: 0;

  width: 250px;
  text-align: center;
`;

const RestaurantDescription = styled.p`
  font-size: 12px;

  margin: 0;

  width: 250px;
  text-align: center;
`;
