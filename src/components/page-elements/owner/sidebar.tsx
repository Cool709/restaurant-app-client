import styled from "styled-components";

import { UserCart } from "../detail/user-cart";

import { useAuth } from "../../../services/auth.service";
import { OWNER_PSTATE } from "../../../types/states";

interface OwnerSideBarProps {
  changeState: (value: string) => void;
}

export const OwnerSideBar = ({ changeState }: OwnerSideBarProps) => {
  const auth = useAuth();

  return (
    <>
      {auth?.user !== null && <UserCart user={auth?.user} />}
      <OptionContainer>
        <Option onClick={() => changeState(OWNER_PSTATE.restaurants)}>
          My Restaurants
        </Option>
        <Option onClick={() => changeState(OWNER_PSTATE.reply)}>
          Waiting for your reply
        </Option>
        <Option onClick={() => changeState(OWNER_PSTATE.create)}>
          Create New Restaurant
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
