import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Text } from "../../../text/text";
import { FormInput } from "../../../input/form-input";
import { FileInputPreview } from "../../../input/file-input";

import { uploadFile } from "../../../../actions/file";
import { APIs } from "../../../../config/general";

import { createRestaurant } from "../../../../actions/restaurant";
import { PRIVATE_ROUTES } from "../../../../config/routes";

export const CreateRestaurantForm = () => {
  const navigate = useNavigate();

  const [name, setTitle] = useState("");
  const [description, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  // ====================
  // Validate input fields
  // ====================
  const validateFields = () => {
    if (name === "" || description === "" || owner === "") {
      toast.warn("Please fill all required fields");
      return false;
    }
    return true;
  };

  // ====================
  // Create restaurant
  // ====================
  const handleCreateRestaurant = async () => {
    if (loading) return;
    setLoading(true);
    if (!validateFields()) return;
    setLoading(true);

    const result = await createRestaurant(name, description, owner);
    if (result.ok !== true) {
      toast.error("An error caused during action");
      setLoading(false);
      return;
    } else {
      const uploadResult = await uploadFile(
        file,
        APIs.UPLOAD_RESTAURANT_IMAGE_API + result.restaurant._id
      );
      if (uploadResult.ok !== true) {
        toast.error("An error caused during file uploading");
      } else {
        toast.success("Successfully created.");
      }
      setLoading(false);

      setTimeout(() => navigate(PRIVATE_ROUTES.admin), 1000);
    }
  };

  return (
    <CreateRestaurantWrapper>
      <ContentWrapper>
        <TitleRow>
          <Text className="large color-orange">Create New Restaurant</Text>
        </TitleRow>
        <InputForm>
          <Row>
            <InputLabel>Restaurant Image</InputLabel>
            <FileInputPreview
              imageChanged={(selectedFile) => setFile(selectedFile)}
            />
          </Row>
          <Row>
            <InputLabel>Name</InputLabel>
            <FormInput
              placeholder="Name"
              value={name}
              onChange={(value) => setTitle(value)}
            />
          </Row>
          <Row>
            <InputLabel>Description</InputLabel>
            <FormInput
              placeholder="Description"
              value={description}
              onChange={(value) => setEmail(value)}
            />
          </Row>
          <Row>
            <InputLabel>Restaurant Owner (Id)</InputLabel>
            <FormInput
              placeholder="Restaurant Owner (Id)"
              value={owner}
              onChange={(value) => setOwner(value)}
            />
          </Row>
          <Row>
            <InputLabel />
            <CreateRestaurantButton onClick={handleCreateRestaurant}>
              Create
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
