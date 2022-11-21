import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

import { Text } from "../text/text";
import { UserCart } from "../page-elements/detail/user-cart";

import { APIs } from "../../config/general";
import { PRIVATE_ROUTES } from "../../config/routes";
import { deleteReview } from "../../actions/review";

interface ReviewCardProps {
  comment: any;
  reviewDeleted: () => void;
}

export const ReviewCard = ({ comment, reviewDeleted }: ReviewCardProps) => {
  const boardRef = useRef(null);

  const opened = true;
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  // ====================
  // Delete review
  // ====================
  const handleDelete = async (id: string) => {
    if (loading) return;
    setLoading(true);
    const result = await deleteReview(id, comment._id);

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setLoading(false);
      return;
    }

    toast.success("Review deleted");
    reviewDeleted();

    setLoading(false);
  };

  useEffect(() => {
    if (boardRef.current !== null) {
      const _height = (boardRef.current as any).scrollHeight;
      setHeight(_height);
    }
  });

  return (
    <>
      {comment !== null && (
        <CommentCardWrapper aria-expanded={opened}>
          <CommentInfo>
            <Details>
              <UserImage
                src={
                  APIs.USER_IMAGE_API +
                  (comment.user === null
                    ? "no-image"
                    : (comment.user as any).image)
                }
                alt="user"
              />
              <Info>
                <Text className="semi-bold">{comment.title}</Text>
                <Text>{comment.description}</Text>
                <Text>{new Date(comment.createdAt).toString()}</Text>
                <Rating initialValue={comment.rate} readonly size={25} />
              </Info>
              {(comment.review === undefined || comment.review === null) && (
                <NewComment
                  to={`${PRIVATE_ROUTES.create + PRIVATE_ROUTES.review}/${
                    comment._id
                  }`}
                >
                  Reply
                </NewComment>
              )}
            </Details>
          </CommentInfo>
          <ReviewBoard
            className="board"
            ref={boardRef}
            style={{ height: `${opened ? height : 0}px` }}
          >
            <ReviewContent className="content">
              <Text className="medium semi-bold color-base">Review</Text>
              {comment.review !== undefined && comment.review !== null && (
                <Details>
                  <UserCart user={comment.review.owner} />
                  <Info>
                    <Text>{comment.review.description}</Text>
                    <Text>{new Date(comment.review.createdAt).toString()}</Text>
                  </Info>
                  <UpdateLink
                    to={`${PRIVATE_ROUTES.update + PRIVATE_ROUTES.review}/${
                      comment._id
                    }`}
                  >
                    Update
                  </UpdateLink>
                  <DeleteButton
                    onClick={() => handleDelete(comment.review._id)}
                  >
                    Delete
                  </DeleteButton>
                </Details>
              )}
            </ReviewContent>
          </ReviewBoard>
        </CommentCardWrapper>
      )}
    </>
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

const CommentInfo = styled.button`
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

  color: ${(props) => props.theme.base};
`;

const ReviewBoard = styled.div`
  overflow: hidden;
  will-change: height;
  transition: height 0.3s linear 0.18s;
`;

const ReviewContent = styled.div`
  margin: 5px 25px 25px;
  font-size: 14px;
  color: #756658;
  opacity: 0;
  transition: opacity 0.3s linear 0.18s;

  display: flex;
  flex-direction: column;

  gap: 6px;
`;

const UserImage = styled.img`
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

const UpdateLink = styled(Link)`
  position: absolute;

  text-decoration: none;

  color: ${(props) => props.theme.orange};

  top: 0;
  right: 0;

  width: 80px;
  height: 25px;

  cursor: pointer;
`;

const DeleteButton = styled.div`
  position: absolute;

  text-decoration: none;

  color: ${(props) => props.theme.orange};

  top: 20px;
  right: 0;

  width: 80px;
  height: 25px;

  cursor: pointer;
`;

const NewComment = styled(Link)`
  position: absolute;

  text-decoration: none;

  top: 0;
  right: 0;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  color: ${(props) => props.theme.orange};
`;
