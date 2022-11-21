import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { UserCard } from "../../../card/user-card";
import { Text } from "../../../text/text";

import { getAllUsers } from "../../../../actions/users";
import { useAuth } from "../../../../services/auth.service";
import { PRIVATE_ROUTES } from "../../../../config/routes";

export const Users = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  // ====================
  // Get all users
  // ====================
  const getUserData = async () => {
    if (auth?.user === null) return;
    const result = await getAllUsers();

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setUsers([]);
      return;
    }

    setUsers(result.users);
  };

  useEffect(() => {
    getUserData();
  }, [auth]);

  return (
    <UsersWrapper>
      <TopBar>
        <Text className="large color-orange semi-bold">Users</Text>
        <CreateNewUser to={PRIVATE_ROUTES.create + PRIVATE_ROUTES.user}>
          Add New User
        </CreateNewUser>
      </TopBar>
      <UsersContainer>
        {users.map((user, index) => {
          return (
            <UserCard
              user={user}
              key={index}
              userDeleted={() => getUserData()}
            />
          );
        })}
      </UsersContainer>
    </UsersWrapper>
  );
};

const UsersWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  margin-top: 20px;
`;

const UsersContainer = styled.div`
  width: 95%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 12px;
  margin-bottom: 20px;
`;

const CreateNewUser = styled(Link)`
  text-decoration: none;

  width: 150px;
  height: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background-color: ${(props) => props.theme.orange};
  color: ${(props) => props.theme.orangeAlt};
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 8px;
`;
