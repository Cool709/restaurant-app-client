import styled from "styled-components";
import { toast } from "react-toastify";
import { useState } from "react";
import { Text } from "../../text/text";
import { FormInput } from "../../input/form-input";
import { FileInputPreview } from "../../input/file-input";

import { OWNER_PSTATE } from "../../../types/states";

import { uploadFile } from "../../../actions/file";
import { APIs } from "../../../config/general";

import {
  createRestaurant,
  validateCreateRestaurantFields,
} from "../../../actions/restaurant";

import { useAuth } from "../../../services/auth.service";

interface CreateRestaurantFormProps {
  changeState: (value: string) => void;
}

// ====================
// Create new restaurant
// ====================
export const CreateRestaurantForm = ({
  changeState,
}: CreateRestaurantFormProps) => {
  const auth = useAuth();
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleCreateRestaurant = async () => {
    if (loading) return;
    setLoading(true);
    if (!validateCreateRestaurantFields(name, description)) {
      toast.warn("Please input required fields");
      return;
    }
    if (auth?.user === null) return;
    const result = await createRestaurant(
      name,
      description,
      (auth?.user as any)._id
    );

    if (result.ok === false) {
      toast.error("An error occured during leaving comment.");
      setLoading(false);
      return;
    } else {
      const uploadResult = await uploadFile(
        file,
        APIs.UPLOAD_RESTAURANT_IMAGE_API + result.restaurant._id
      );
      if (uploadResult.ok !== true) {
        toast.error("An error caused during file uploading");
        setLoading(false);
      } else {
        setLoading(false);
        toast.success(result.message);
      }

      setTimeout(() => changeState(OWNER_PSTATE.restaurants), 1000);
    }
  };

  return (
    <CreateRestaurantWrapper>
      <ContentWrapper>
        <TitleRow>
          <Text className="large color-orange">Create A Restaurant</Text>
        </TitleRow>
        <InputForm>
          <Row>
            <InputLabel>Restaurant Image</InputLabel>
            <FileInputPreview
              imageChanged={(selectedFile) => setFile(selectedFile)}
            />
          </Row>
          <Row>
            <InputLabel>Title</InputLabel>
            <FormInput
              placeholder="Title"
              value={name}
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
            <InputLabel />
            <CreateRestaurantButton onClick={handleCreateRestaurant}>
              Create Restaurant
            </CreateRestaurantButton>
          </Row>
        </InputForm>
      </ContentWrapper>
    </CreateRestaurantWrapper>
  );
};

const CreateRestaurantWrapper = styled.div`
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

const CreateRestaurantButton = styled.button`
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
