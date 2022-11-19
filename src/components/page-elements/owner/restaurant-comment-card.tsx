import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

import { Text } from "../../text/text";
import { UserCart } from "../detail/user-cart";

import { APIs } from "../../../config/general";
import { PRIVATE_ROUTES } from "../../../config/routes";

interface CommentProps {
  restaurant: any;
}

export const RestaurantCommentCard = ({ restaurant }: CommentProps) => {
  const boardRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (boardRef.current !== null) {
      const _height = (boardRef.current as any).scrollHeight;
      setHeight(_height);
    }
  });

  return (
    <CommentCardWrapper aria-expanded={opened}>
      <RestaurantInfo onClick={() => setOpened(!opened)}>
        <Details>
          <RestaurantCardImage
            src={
              APIs.RESTAURANT_IMAGE_API +
              (restaurant === null ? "no-image" : (restaurant as any).image)
            }
            alt="restaurant"
          />
          <Info>
            <Text className="semi-bold">{restaurant.name}</Text>
            <Text>{restaurant.description}</Text>
            <Rating initialValue={restaurant.normalRate} readonly size={25} />
          </Info>
        </Details>
      </RestaurantInfo>
      <CommentBoard
        className="board"
        ref={boardRef}
        style={{ height: `${opened ? height : 0}px` }}
      >
        <CommentContent className="content">
          <Text className="medium semi-bold color-base">Comments</Text>
          {restaurant.comments.map((comment: any, index: any) => {
            return (
              <Details key={index}>
                <UserCart user={comment.user} />
                <Info>
                  <Text>{comment.title}</Text>
                  <Text>{comment.description}</Text>
                  <Text>{new Date(comment.createdAt).toString()}</Text>
                  <Rating initialValue={comment.rate} readonly size={25} />
                </Info>
                <ReplyLink to={`${PRIVATE_ROUTES.replyComment}/${comment._id}`}>
                  Reply
                </ReplyLink>
              </Details>
            );
          })}
        </CommentContent>
      </CommentBoard>
    </CommentCardWrapper>
  );
};

const CommentCardWrapper = styled.div`
  width: 100%;

  background-color: ${(props) => props.theme.orangeAlt};
  margin-bottom: 8px;

  &[aria-expanded="true"] {
    button {
      color: #957029;

      &:before {
        transform: rotate(0deg);
      }
    }

    .content {
      opacity: 1;
    }
  }

  &[aria-expanded="false"] {
    .board {
      height: 0px;
    }
  }
`;

const RestaurantInfo = styled.button`
  width: 100%;

  position: relative;
  display: block;

  text-align: left;
  font-size: 17px;
  font-weight: 500;

  background: none;
  border: none;
  outline: none;

  padding: 25px 60px 25px 25px;

  transition: all 0.2s linear;
  cursor: pointer;

  color: ${(props) => props.theme.base};

  &:after,
  &:before {
    content: "";
    position: absolute;
    right: 25px;
    top: 50%;
    width: 22px;
    height: 2px;
    margin-top: -2px;
    background-color: ${(props) => props.theme.base};
  }

  &:before {
    transform: rotate(-90deg);
    transition: transform 0.35s cubic-bezier(0.65, 0.05, 0.36, 1);
  }
`;

const CommentBoard = styled.div`
  overflow: hidden;
  will-change: height;
  transition: height 0.3s linear 0.18s;
`;

const CommentContent = styled.div`
  margin: 5px 25px 25px;
  font-size: 14px;
  color: #756658;
  opacity: 0;
  transition: opacity 0.3s linear 0.18s;

  display: flex;
  flex-direction: column;

  gap: 6px;
`;

const RestaurantCardImage = styled.img`
  width: 100px;
  height: 100px;

  border: none;
  border-radius: 8px;

  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;

  gap: 8px;

  position: relative;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 4px;
`;

const ReplyLink = styled(Link)`
  position: absolute;

  text-decoration: none;

  color: ${(props) => props.theme.orange};

  top: 0;
  right: 0;

  width: 80px;
  height: 25px;

  cursor: pointer;
`;
