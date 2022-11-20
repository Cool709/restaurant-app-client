import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { Text } from "../../../text/text";
import { FormInput } from "../../../input/form-input";
import { DotLoader } from "react-spinners";

import { updateReview } from "../../../../actions/review";

import { PRIVATE_ROUTES } from "../../../../config/routes";

interface ReplyCommentFormProps {
  comment: any;
}

export const UpdateReplyForm = ({ comment }: ReplyCommentFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reply, setReply] = useState(comment.review.description);
  const [loading, setLoading] = useState(false);

  const handleUpdateReply = async () => {
    if (loading) return;
    setLoading(true);
    if (reply === "") {
      toast.warn("Please input required fields");
      return;
    }
    const result = await updateReview(comment.review._id, reply);

    if (result.ok === false) {
      toast.error("An error occured during replying comment.");
      setLoading(false);
      return;
    } else {
      setLoading(false);
      toast.success("Successfully Updated.");

      setTimeout(() => navigate(`${PRIVATE_ROUTES.admin}`), 1000);
    }
  };

  return (
    <UpdateReplyWrapper>
      <ContentWrapper>
        <TitleRow>
          <Text className="large color-orange">What the customer says</Text>
        </TitleRow>
        <Text className="medium semi-bold">{comment.title}</Text>
        <Text className="medium">{comment.description}</Text>
        <TitleRow>
          <Text className="large color-orange">Reply To User</Text>
        </TitleRow>
        <InputForm>
          <Row>
            <InputLabel>Reply</InputLabel>
            <FormInput
              placeholder="Reply"
              value={reply}
              onChange={(value) => setReply(value)}
            />
          </Row>
          <Row>
            <InputLabel />
            <UpdateReplyButton onClick={handleUpdateReply}>
              <DotLoader
                color={"white"}
                size={20}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Update
            </UpdateReplyButton>
          </Row>
        </InputForm>
      </ContentWrapper>
    </UpdateReplyWrapper>
  );
};

const UpdateReplyWrapper = styled.div`
  width: 100%;

  margin: 0px;

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

  gap: 16px;
`;

const TitleRow = styled.div`
  width: 98%;

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
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  gap: 4px;

  margin-bottom: 4px;

  p {
    text-align: left;
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

const UpdateReplyButton = styled.button`
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
