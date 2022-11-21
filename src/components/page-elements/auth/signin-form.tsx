import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AiOutlineMail, AiOutlineUnlock } from "react-icons/ai";
import { DotLoader } from "react-spinners";

import { Text } from "../../text/text";
import { FormInput } from "../../input/form-input";

import { useAuth } from "../../../services/auth.service";

import { setAuthToken } from "../../../utils/set-auth-token";
import { validateEmail } from "../../../utils/email-validator";
import { validatePassword } from "../../../utils/password-validator";

import { signInAction } from "../../../actions/auth";
import { PRIVATE_ROUTES } from "../../../config/routes";
import { ROLE } from "../../../constants/constants";

export const SignInForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (email === "" || password === "") {
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

  const handleLogin = async () => {
    if (loading) return;
    if (!validateFields()) return;
    setLoading(true);

    const result = await signInAction(email, password);
    if (result.ok !== true) {
      toast.error("An error caused during sign in");
      toast.error(result.message);
    } else {
      setAuthToken(result.token);
      auth?.setUserData(result);

      toast.success("You signed in successfully.");

      var route = PRIVATE_ROUTES.home;
      if (result.user.role === ROLE.owner) route = PRIVATE_ROUTES.restaurants;
      else if (result.user.role === ROLE.admin) route = PRIVATE_ROUTES.admin;

      setTimeout(() => navigate(route), 1000);
    }

    setLoading(false);
  };

  return (
    <SignIpFormWrapper>
      <Text className="color-black semi-bold large">Sign In</Text>
      <InputContainer>
        <FormInput
          icon={<AiOutlineMail className="color-base size-20" />}
          placeholder="Email"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <FormInput
          icon={<AiOutlineUnlock className="color-base size-20" />}
          placeholder="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          type="password"
        />
      </InputContainer>
      <SignInButton onClick={() => handleLogin()}>
        <DotLoader
          color={"white"}
          size={20}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Text className="color-white medium">Sign In</Text>
      </SignInButton>
    </SignIpFormWrapper>
  );
};

const SignIpFormWrapper = styled.div`
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

const SignInButton = styled.button`
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
