import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Text } from "../../../text/text";
import { FormInput } from "../../../input/form-input";
import { FileInputPreview } from "../../../input/file-input";

import { uploadFile } from "../../../../actions/file";
import { APIs } from "../../../../config/general";
import { ROLE } from "../../../../constants/constants";

import { validateEmail } from "../../../../utils/email-validator";
import { validatePassword } from "../../../../utils/password-validator";

import { signUpAction } from "../../../../actions/auth";
import { PRIVATE_ROUTES } from "../../../../config/routes";

export const CreateUserForm = () => {
  const navigate = useNavigate();

  const [name, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLE.user);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (name === "" || email === "" || password === "") {
      toast.warn("Please fill all required fields");
      return false;
    }
    if (!validateEmail(email)) {
      toast.warn("Please input valid email");
      return false;
    }
    if (!validatePassword(password)) {
      toast.warn("Input password more than 6 characters");
      return false;
    }
    return true;
  };

  const handleCreateUser = async () => {
    if (loading) return;
    setLoading(true);
    if (!validateFields()) return;
    setLoading(true);

    const result = await signUpAction(name, email, password, role);
    if (result.ok !== true) {
      toast.error("An error caused during sign up");
      setLoading(false);
      return;
    } else {
      const uploadResult = await uploadFile(
        file,
        APIs.UPLOAD_USER_IMAGE_API + result.user._id
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
    <UpdateUserWrapper>
      <ContentWrapper>
        <TitleRow>
          <Text className="large color-orange">Update User Data</Text>
        </TitleRow>
        <InputForm>
          <Row>
            <InputLabel>User Avatar</InputLabel>
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
            <InputLabel>Email</InputLabel>
            <FormInput
              placeholder="Email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
          </Row>
          <Row>
            <InputLabel>Password</InputLabel>
            <FormInput
              placeholder="Password"
              value={password}
              onChange={(value) => setPassword(value)}
              type="password"
            />
          </Row>
          <Row>
            <InputLabel>Role</InputLabel>
            <RoleContainer>
              <RoleSelector
                active={role === ROLE.user}
                onClick={() => setRole(ROLE.user)}
              >
                As a User
              </RoleSelector>
              <RoleSelector
                active={role === ROLE.owner}
                onClick={() => setRole(ROLE.owner)}
              >
                As a Owner
              </RoleSelector>
            </RoleContainer>
          </Row>
          <Row>
            <InputLabel />
            <UpdateUserButton onClick={handleCreateUser}>
              Create
            </UpdateUserButton>
          </Row>
        </InputForm>
      </ContentWrapper>
    </UpdateUserWrapper>
  );
};

const UpdateUserWrapper = styled.div`
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

const UpdateUserButton = styled.button`
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

const RoleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 8px;
`;

interface RoleSelectorProps {
  active: boolean;
}

const RoleSelector = styled.div<RoleSelectorProps>`
  width: 100px;
  height: 40px;

  border: 1px solid
    ${(props) => (props.active ? props.theme.orange : props.theme.grey)};
  border-radius: 4px;

  color: ${(props) => (props.active ? props.theme.orange : props.theme.base)};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;