import styled from "styled-components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { BlankContainer } from "../../components/container/blank-container";

import { getUserById } from "../../actions/users";
import { UpdateUserForm } from "../../components/page-elements/admin/users/update";

export const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const result = await getUserById(String(id));

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setUser(null);
      return;
    }

    setUser(result.user);
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <CreateUserWrapper>
      <BlankContainer>
        <ContentWrapper>
          {user !== null && <UpdateUserForm user={user} />}
        </ContentWrapper>
      </BlankContainer>
    </CreateUserWrapper>
  );
};

const CreateUserWrapper = styled.div`
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
  flex-direction: row;
  align-items: flex-start;

  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
