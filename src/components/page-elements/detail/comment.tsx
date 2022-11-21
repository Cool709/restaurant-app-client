import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

import { Text } from "../../text/text";
import { UserCart } from "./user-cart";

interface CommentProps {
  comment: any;
}

// ====================
// Comment container
// ====================
export const Comment = ({ comment }: CommentProps) => {
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
    <CommentWrapper aria-expanded={opened}>
      <CommentArea onClick={() => setOpened(!opened)}>
        <Details>
          <UserCart user={comment.user} />
          <Info>
            <Text className="semi-bold">{comment.title}</Text>
            <Text>{comment.description}</Text>
            <Text>{new Date(comment.createdAt).toString()}</Text>
            <Rating initialValue={comment.rate} readonly size={25} />
          </Info>
        </Details>
      </CommentArea>
      <CommentBoard
        className="board"
        ref={boardRef}
        style={{ height: `${opened ? height : 0}px` }}
      >
        <CommentContent className="content">
          <Text className="medium semi-bold color-base">Reply</Text>
          {comment.review !== undefined && (
            <Details>
              <UserCart user={comment.review.owner} />
              <Info>
                <Text>{comment.review.description}</Text>
                <Text>{new Date(comment.createdAt).toString()}</Text>
              </Info>
            </Details>
          )}
          {comment.review === undefined && "Not Reviewd Yet"}
        </CommentContent>
      </CommentBoard>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
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

const CommentArea = styled.button`
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

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;

  gap: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 4px;
`;
