import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Text } from "../../../text/text";
import { Rating } from "react-simple-star-rating";
import { FormInput } from "../../../input/form-input";
import { DotLoader } from "react-spinners";

import { updateComment } from "../../../../actions/comment";

import { PRIVATE_ROUTES } from "../../../../config/routes";

interface UpdateCommentFormProps {
  comment: any;
}

export const UpdateCommentForm = ({ comment }: UpdateCommentFormProps) => {
  const navigate = useNavigate();

  const [rate, setRate] = useState(comment.rate);
  const [title, setTitle] = useState(comment.title);
  const [description, setDescription] = useState(comment.description);
  const [owner, setOwner] = useState(comment.user._id);
  const [loading, setLoading] = useState(false);

  // ====================
  // Update comment
  // ====================
  const handleUpdateComment = async () => {
    if (loading) return;
    setLoading(true);
    if (title === "" || description === "" || owner === "") {
      toast.warn("Please input all required fields");
      setLoading(false);
      return;
    }

    const result = await updateComment(
      rate,
      title,
      description,
      owner,
      comment._id
    );
    if (result.ok !== true) {
      toast.error("An error caused during sign up");
      setLoading(false);
      return;
    } else {
      toast.success("Successfully updated.");
      console.log(comment);

      setTimeout(() => navigate(`${PRIVATE_ROUTES.admin}`), 1000);
      setLoading(false);
    }
  };

  return (
    <UpdateCommentWrapper>
      <ContentWrapper>
        <TitleRow>
          <Text className="large color-orange">New Comment</Text>
        </TitleRow>
        <InputForm>
          <Row>
            <InputLabel>Rate the Restaurant</InputLabel>
            <Rating
              initialValue={rate}
              onClick={(selectedRate) => setRate(selectedRate)}
              size={30}
            />
          </Row>
          <Row>
            <InputLabel>Title</InputLabel>
            <FormInput
              placeholder="Title"
              value={title}
              onChange={(value) => setTitle(value)}
            />
          </Row>
          <Row>
            <InputLabel>Description</InputLabel>
            <FormInput
              placeholder="Description"
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </Row>
          <Row>
            <InputLabel>Commenter (id)</InputLabel>
            <FormInput
              placeholder="Commenter (id)"
              value={owner}
              onChange={(value) => setOwner(value)}
            />
          </Row>
          <Row>
            <InputLabel />
            <UpdateCommentButton onClick={handleUpdateComment}>
              <DotLoader
                color={"white"}
                size={20}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Create
            </UpdateCommentButton>
          </Row>
        </InputForm>
      </ContentWrapper>
    </UpdateCommentWrapper>
  );
};

const UpdateCommentWrapper = styled.div`
  width: 100%;

  margin: 0px 20px;

  @media (max-width: 768px) {
    margin: 0px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 20px;

  gap: 8px;
`;

const TitleRow = styled.div`
  width: 95%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  gap: 8px;

  background-color: ${(props) => props.theme.black};

  padding: 8px;

  border-radius: 4px;
`;

const Row = styled.div`
  width: 98%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  gap: 8px;

  margin-bottom: 4px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;

    gap: 4px;

    p {
      text-align: left;
    }
  }
`;

const InputForm = styled.div`
  margin-top: 12px;
`;

const InputLabel = styled.p`
  width: 200px;
  text-align: right;

  margin: 0;
`;

const UpdateCommentButton = styled.button`
  width: 150px;
  height: 32px;

  margin-top: 8px;

  font-size: 16px;
  font-weight: 400;

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
