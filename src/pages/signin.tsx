import styled from "styled-components";
import { BlankContainer } from "../components/container/blank-container";
import { SignInForm } from "../components/page-elements/auth/signin-form";

// ====================
// Sign in page
// ====================
export const SignIn = () => {
  return (
    <SignInWrapper>
      <BlankContainer>
        <ContentWrapper>
          <SignInForm />
        </ContentWrapper>
      </BlankContainer>
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 32px;
`;
