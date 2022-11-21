import styled from "styled-components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { BlankContainer } from "../components/container/blank-container";

import { getCommentById } from "../actions/comment";
import { ReplyCommentForm } from "../components/page-elements/comment/reply-comment-form";

// ====================
// Create review
// ====================
export const ReplyComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);

  const getRestaurantData = async () => {
    const result = await getCommentById(String(id));

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setComment(null);
      return;
    }

    setComment(result.comment);
  };

  useEffect(() => {
    getRestaurantData();
  });

  return (
    <ReplyCommentWrapper>
      <BlankContainer>
        <ContentWrapper>
          {comment !== null && <ReplyCommentForm comment={comment} />}
        </ContentWrapper>
      </BlankContainer>
    </ReplyCommentWrapper>
  );
};

const ReplyCommentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 134px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 134px);

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
