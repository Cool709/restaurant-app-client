import styled from "styled-components";

import { Text } from "../../text/text";

import { ADMIN_PSTATE } from "../../../types/states";

interface AdminSideBarProps {
  changeState: (value: string) => void;
}

// ====================
// Left side bar in admin page
// ====================
export const AdminSideBar = ({ changeState }: AdminSideBarProps) => {
  return (
    <>
      <Text className="large color-weight bold">Admin</Text>
      <OptionContainer>
        <Option onClick={() => changeState(ADMIN_PSTATE.users)}>Users</Option>
        <Option onClick={() => changeState(ADMIN_PSTATE.restaurants)}>
          Restaurants
        </Option>
        <Option onClick={() => changeState(ADMIN_PSTATE.comments)}>
          Comments
        </Option>
        <Option onClick={() => changeState(ADMIN_PSTATE.reviews)}>
          Reviews
        </Option>
      </OptionContainer>
    </>
  );
};

const OptionContainer = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;

  gap: 16px;
`;

const Option = styled.p`
  font-size: 14px;
  font-weight: 700;

  margin: 0;

  color: ${(props) => props.theme.orangeAlt};

  cursor: pointer;

  transition: color linear 0.3s;

  &:hover {
    color: ${(props) => props.theme.orange};
  }
`;
