import styled from "styled-components";

import { Text } from "../../text/text";
import { APIs } from "../../../config/general";

interface UserCartProps {
  user: any;
}

export const UserCart = ({ user }: UserCartProps) => {
  return (
    <UserCartWrapper>
      <UserImage
        src={
          APIs.USER_IMAGE_API +
          (user.image === undefined ? "no-image" : user.image)
        }
        alt="user"
      />
      <Text className="semi-bold">{user.name}</Text>
    </UserCartWrapper>
  );
};

const UserCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 4px;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;

  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 50%;
`;
