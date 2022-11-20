import styled from "styled-components";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { ReviewCard } from "../../../card/review-card";
import { Text } from "../../../text/text";

import { getComments } from "../../../../actions/comment";
import { useAuth } from "../../../../services/auth.service";

export const ReviewsAdmin = () => {
  const auth = useAuth();
  const [comments, setComments] = useState([]);

  const getCommentData = async () => {
    if (auth?.user === null) return;
    const result = await getComments();

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setComments([]);
      return;
    }

    setComments(result.comments);
  };

  useEffect(() => {
    getCommentData();
  }, [auth]);

  return (
    <ReviewsWrapper>
      <Text className="large color-orange semi-bold">Reviews</Text>
      <ReviewContainer>
        {comments.map((comment, index) => {
          return (
            <ReviewCard
              comment={comment}
              reviewDeleted={getCommentData}
              key={index}
            />
          );
        })}
      </ReviewContainer>
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  margin-top: 20px;
`;

const ReviewContainer = styled.div`
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
