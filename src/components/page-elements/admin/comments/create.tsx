import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Text } from "../../../text/text";
import { Rating } from "react-simple-star-rating";
import { FormInput } from "../../../input/form-input";
import { DotLoader } from "react-spinners";

import {
  leaveComment,
  validateLeaveCommentFields,
} from "../../../../actions/restaurant";
import { PRIVATE_ROUTES } from "../../../../config/routes";

import { useAuth } from "../../../../services/auth.service";

export const CreateCommentForm = () => {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [rate, setRate] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLeaveComment = async () => {
    if (loading) return;
    if (!validateLeaveCommentFields(title, description)) {
      toast.warn("Please input required fields");
      return;
    }
    if (auth?.user === null) return;
    setLoading(true);
    const result = await leaveComment(
      rate,
      title,
      description,
      String(id),
      owner
    );

    if (result.ok === false) {
      toast.error("An error occured during leaving comment.");
      setLoading(false);
      return;
    } else {
      setLoading(false);
      toast.success(result.message);

      setTimeout(() => navigate(`${PRIVATE_ROUTES.detail}/${id}`), 1000);
    }
  };

  return (
    <CreateCommentWrapper>
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
            <CreateCommentButton onClick={handleLeaveComment}>
              <DotLoader
                color={"white"}
                size={20}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Create
            </CreateCommentButton>
          </Row>
        </InputForm>
      </ContentWrapper>
    </CreateCommentWrapper>
  );
};

const CreateCommentWrapper = styled.div`
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

const CreateCommentButton = styled.button`
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
