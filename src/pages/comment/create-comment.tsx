import styled from "styled-components";

import { BlankContainer } from "../../components/container/blank-container";

import { CreateCommentForm } from "../../components/page-elements/admin/comments/create";

export const CreateComment = () => {
  return (
    <CreateCommentWrapper>
      <BlankContainer>
        <ContentWrapper>
          <CreateCommentForm />
        </ContentWrapper>
      </BlankContainer>
    </CreateCommentWrapper>
  );
};

const CreateCommentWrapper = styled.div`
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
