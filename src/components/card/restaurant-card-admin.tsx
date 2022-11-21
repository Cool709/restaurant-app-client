import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

import { Text } from "../text/text";

import { APIs } from "../../config/general";
import { deleteRestaurant } from "../../actions/restaurant";
import { PRIVATE_ROUTES } from "../../config/routes";

interface UserCardProps {
  restaurant: any;
  restaurantDeleted: () => void;
}

export const RestaurantCardAdmin = ({
  restaurant,
  restaurantDeleted,
}: UserCardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ====================
  // Update restaurant
  // ====================
  const handleUpdate = () => {
    navigate(
      `${PRIVATE_ROUTES.update + PRIVATE_ROUTES.restaurant}/${restaurant._id}`
    );
  };

  // ====================
  // Link to detailed view
  // ====================
  const handleExplore = () => {
    navigate(`${PRIVATE_ROUTES.detail}/${restaurant._id}`);
  };

  // ====================
  // Delete restaurant
  // ====================
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    const result = await deleteRestaurant(restaurant._id);

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setLoading(false);
      return;
    }

    toast.success("Restaurant deleted");
    restaurantDeleted();

    setLoading(false);
  };

  return (
    <RestaurantCardWrapper>
      <RestaurantImage
        src={
          APIs.RESTAURANT_IMAGE_API +
          (restaurant.image === undefined ? "no-image" : restaurant.image)
        }
        alt="restaurant"
      />
      <CardContent>
        <Text className="medium bold">{restaurant.name}</Text>
        <Text className="bold">{restaurant.description}</Text>
        <Text className="bold">{restaurant._id}</Text>
        <Text className="bold">
          {new Date(restaurant.createdAt).toString()}
        </Text>
        <Rating initialValue={restaurant.normalRate} readonly size={25} />
      </CardContent>
      <ActionContainer>
        <Text className="color-orange" onClick={handleExplore}>
          View
        </Text>
        <Text className="color-orange" onClick={handleUpdate}>
          Update
        </Text>
        <Text className="color-orange" onClick={handleDelete}>
          Delete
        </Text>
      </ActionContainer>
    </RestaurantCardWrapper>
  );
};

const RestaurantCardWrapper = styled.div`
  width: 400px;

  position: relative;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;

  text-decoration: none;

  color: ${(props) => props.theme.base};

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

  object-fit: cover;
`;

const CardContent = styled.div`
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

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: stretch;
  gap: 8px;

  padding: 12px;

  position: absolute;
  top: 0;
  right: 0;

  p {
    cursor: pointer;
  }
`;
