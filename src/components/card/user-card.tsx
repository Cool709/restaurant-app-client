import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

import { Text } from "../text/text";

import { APIs } from "../../config/general";
import { deleteUser } from "../../actions/users";
import { PRIVATE_ROUTES } from "../../config/routes";

interface UserCardProps {
  user: any;
  userDeleted: () => void;
}

export const UserCard = ({ user, userDeleted }: UserCardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    navigate(`${PRIVATE_ROUTES.update + PRIVATE_ROUTES.user}/${user._id}`);
  };

  const handleDelete = async () => {
    if (loading) return;
    const result = await deleteUser(user._id);

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setLoading(false);
      return;
    }

    toast.success("User deleted");
    userDeleted();

    setLoading(true);
  };

  return (
    <UserCardWrapper>
      <UserImage
        src={
          APIs.USER_IMAGE_API +
          (user.image === undefined ? "no-image" : user.image)
        }
        alt="user"
      />
      <UserCardontent>
        <Text className="medium bold">{user.name}</Text>
        <Text className="medium bold">{user._id}</Text>
        <Text className="medium bold">{user.email}</Text>
        <Text className="medium bold">{user.role}</Text>
      </UserCardontent>
      <ActionContainer>
        <Text className="color-orange" onClick={handleUpdate}>
          Update
        </Text>
        <Text onClick={handleDelete}>Delete</Text>
      </ActionContainer>
    </UserCardWrapper>
  );
};

const UserCardWrapper = styled.div`
  width: 400px;

  position: relative;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;

  text-decoration: none;

  color: ${(props) => props.theme.base};

  gap: 8px;

  background-color: ${(props) => props.theme.white};

  box-shadow: 0px 4px 80px rgba(255, 159, 13, 0.15);

  @media (max-width: 425px) {
    width: 300px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;

  border-radius: 6px;

  object-fit: cover;
`;

const UserCardontent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  gap: 4px;

  padding: 12px;
  padding-right: 14px;

  @media (max-width: 425px) {
    text-align: center;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: stretch;
  gap: 8px;

  padding: 12px;

  position: absolute;
  top: 0;
  right: 0;

  p {
    cursor: pointer;
  }
`;
