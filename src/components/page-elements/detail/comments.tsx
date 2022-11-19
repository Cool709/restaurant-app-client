import styled from "styled-components";
import { Comment } from "./comment";

interface CommentsProp {
  comments: any;
}

export const Comments = ({ comments }: CommentsProp) => {
  return (
    <CommentsWrapper>
      {comments.map((comment: any, index: number) => {
        return <Comment comment={comment} key={index} />;
      })}
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div`
  width: 100%;

  margin: 16px 20px;
`;
