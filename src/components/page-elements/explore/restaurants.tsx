import styled from "styled-components";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { getRestaurntsByRate } from "../../../actions/restaurant";
import { Title } from "../../text/title";
import { Text } from "../../text/text";
import { RestaurantCard } from "../../card/restaurant-card";

const SearchMethods = {
  all: "all",
  rate: "rate",
};

export const ExploreRestaurants = () => {
  const [searchMethod, setSearchMethod] = useState(SearchMethods.all);
  const [rate, setRate] = useState(4);
  const [restaurants, setRestaurants] = useState([]);

  const handleRating = async (selectedRate: number) => {
    setSearchMethod(SearchMethods.rate);
    setRate(selectedRate);
    getRestaurantData(selectedRate);
  };

  const handleViewAll = async () => {
    setSearchMethod(SearchMethods.all);
    getRestaurantData(0);
  };

  const getRestaurantData = async (selectedRate: number) => {
    const result = await getRestaurntsByRate(0, selectedRate);

    if (result.ok !== true) {
      toast.error("An error occured when fetching");
      setRestaurants([]);
      return;
    }

    setRestaurants(result.restaurants);
  };

  useEffect(() => {
    handleViewAll();
  }, []);

  return (
    <RestaurantsWrapper>
      <Header>
        <Title>Explore Restaurants</Title>
        <RateDescription>
          Rate the stars to filter restaurants or{" "}
          <ViewAll onClick={handleViewAll}>View All</ViewAll>
        </RateDescription>
        <Rating initialValue={rate} onClick={handleRating} size={30} />
      </Header>
      <Text className="medium font-barlow">
        {searchMethod === SearchMethods.all
          ? "All Restaurants: "
          : `Restaurants Over Rate ${rate}: `}
        {restaurants.length === 0 && "No result"}
      </Text>
      <RestaurantContainer>
        {restaurants.map((restaurant, index) => {
          return <RestaurantCard restaurant={restaurant} key={index} />;
        })}
      </RestaurantContainer>
    </RestaurantsWrapper>
  );
};

const RestaurantsWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  margin: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;

  gap: 12px;
`;

const RestaurantContainer = styled.div`
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

const ViewAll = styled.span`
  width: 100px;
  height: 30px;

  border: none;
  border-radius: 6px;

  font-size: 14px;
  color: ${(props) => props.theme.white};
  font-weight: 600;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background-color: ${(props) => props.theme.orange};
`;

const RateDescription = styled.div`
  text-align: center;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
