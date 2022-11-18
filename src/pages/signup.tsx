import styled from "styled-components";
import { BlankContainer } from "../components/container/blank-container";
import { SignUpForm } from "../components/page-elements/signup-form";

export const SignUp = () => {
  return (
    <SignUpWrapper>
      <BlankContainer>
        <ContentWrapper>
          <SignUpForm />
        </ContentWrapper>
      </BlankContainer>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
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
