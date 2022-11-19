import styled from "styled-components";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { RestaurantCommentCard } from "./restaurant-comment-card";
import { Text } from "../../text/text";

import { getRestaurantsWithWaitingList } from "../../../actions/restaurant";
import { useAuth } from "../../../services/auth.service";

export const ReplyWaitList = () => {
  const auth = useAuth();
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurantData = async () => {
    if (auth?.user === null) return;
    const result = await getRestaurantsWithWaitingList(String(auth?.user._id));
    console.log(result);

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setRestaurants([]);
      return;
    }

    setRestaurants(
      result.restaurants.filter(
        (restaurant: any) => restaurant.comments.length > 0
      )
    );
  };

  useEffect(() => {
    getRestaurantData();
  }, [auth]);

  return (
    <ReplyWaitListWrapper>
      <Text className="large color-orange semi-bold">
        All Comments Waiting for your reply
      </Text>
      <CommentContainer>
        {restaurants.map((restaurant, index) => {
          return <RestaurantCommentCard restaurant={restaurant} key={index} />;
        })}
      </CommentContainer>
    </ReplyWaitListWrapper>
  );
};

const ReplyWaitListWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  margin-top: 20px;
`;

const CommentContainer = styled.div`
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
