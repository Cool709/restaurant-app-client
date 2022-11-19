import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

import { AiOutlineMail, AiOutlineUnlock, AiOutlineUser } from "react-icons/ai";
import { DotLoader } from "react-spinners";

import { Text } from "../../text/text";
import { FormInput } from "../../input/form-input";
import { FileInputPreview } from "../../input/file-input";

import { ROLE } from "../../../constants/constants";
import { PUBLIC_ROUTES } from "../../../config/routes";

import { validateEmail } from "../../../utils/email-validator";
import { validatePassword } from "../../../utils/password-validator";

// action
import { signUpAction } from "../../../actions/auth";
import { uploadFile } from "../../../actions/file";

import { APIs } from "../../../config/general";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(ROLE.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

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

  const handleSignUp = async () => {
    if (loading) return;
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
        toast.success("You signed up successfully.");
      }
      setLoading(false);

      setTimeout(() => navigate(PUBLIC_ROUTES.login), 1000);
    }
  };

  return (
    <SignUpFormWrapper>
      <Text className="color-black semi-bold large">Sign Up</Text>
      <InputContainer>
        <FormInput
          icon={<AiOutlineUser className="color-base size-20" />}
          placeholder="Name *"
          value={name}
          onChange={(value) => setName(value)}
        />
        <FormInput
          icon={<AiOutlineMail className="color-base size-20" />}
          placeholder="Email *"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <FormInput
          icon={<AiOutlineUnlock className="color-base size-20" />}
          placeholder="Password *"
          value={password}
          onChange={(value) => setPassword(value)}
          type="password"
        />
        <FileInputPreview imageChanged={(file) => setFile(file)} />
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
      </InputContainer>
      <SignUpButton onClick={() => handleSignUp()}>
        <DotLoader
          color={"white"}
          size={20}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Text className="color-white medium">Sign Up</Text>
      </SignUpButton>
    </SignUpFormWrapper>
  );
};

const SignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;

  padding: 32px;

  box-shadow: 0px 4px 80px rgba(255, 159, 13, 0.15);

  background-color: ${(props) => props.theme.white};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;
`;

const SignUpButton = styled.button`
  height: 36px;
  min-width: 300px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border: none;
  outline: none;

  cursor: pointer;

  background-color: ${(props) => props.theme.orange};
`;

const RoleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

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
