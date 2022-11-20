import styled from "styled-components";
import { useState } from "react";

import { BlankContainer } from "../components/container/blank-container";

import { AdminSideBar } from "../components/page-elements/admin/sidebar";
import { ADMIN_PSTATE } from "../types/states";

import { Users } from "../components/page-elements/admin/users/users";
import { AdminRestaurants } from "../components/page-elements/admin/restaurants/restaurants";
import { CommentsAdmin } from "../components/page-elements/admin/comments/comments";
import { ReviewsAdmin } from "../components/page-elements/admin/reviews/reviews";

export const Admin = () => {
  const [pstate, setPState] = useState(ADMIN_PSTATE.users);

  return (
    <AdminWrapper>
      <BlankContainer>
        <ContentWrapper>
          <SideContentWrapper>
            <AdminSideBar changeState={(value) => setPState(value)} />
          </SideContentWrapper>
          <ContentDetailWrapper>
            {pstate === ADMIN_PSTATE.users && <Users />}
            {pstate === ADMIN_PSTATE.restaurants && <AdminRestaurants />}
            {pstate === ADMIN_PSTATE.comments && <CommentsAdmin />}
            {pstate === ADMIN_PSTATE.reviews && <ReviewsAdmin />}
          </ContentDetailWrapper>
        </ContentWrapper>
      </BlankContainer>
    </AdminWrapper>
  );
};

const AdminWrapper = styled.div`
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

const SideContentWrapper = styled.div`
  width: 300px;

  margin: 16px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 12px;
  flex-wrap: wrap;

  padding: 50px 20px 50px 20px;

  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};

  border: none;
  border-radius: 8px;
`;

const ContentDetailWrapper = styled.div`
  width: 100%;

  margin: 0px 20px;

  @media (max-width: 768px) {
    margin: 0px;
  }
`;
