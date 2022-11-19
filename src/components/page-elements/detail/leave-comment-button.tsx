import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { commentAble } from "../../../actions/restaurant";
import { PRIVATE_ROUTES } from "../../../config/routes";

interface RestaurantDetailProps {
  restaurant: any;
}

export const LeaveCommentButton = ({ restaurant }: RestaurantDetailProps) => {
  const [availableToComment, setAvailableToComment] = useState(false);
  useEffect(() => {
    setAvailableToComment(commentAble(restaurant.comments));
  }, []);

  return (
    <>
      {availableToComment && (
        <LeaveCommentButtonContainer
          to={`${PRIVATE_ROUTES.leaveComment}/${restaurant._id}`}
        >
          Leave Comment
        </LeaveCommentButtonContainer>
      )}
    </>
  );
};

const LeaveCommentButtonContainer = styled(Link)`
  width: 150px;
  height: 32px;

  font-size: 16px;
  font-weight: 400;
  text-decoration: none;

  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.orange};

  outline: none;
  border: none;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
