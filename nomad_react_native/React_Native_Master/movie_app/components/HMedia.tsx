import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Movie, TV } from "../api";

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage?: number;
  releaseDate?: string;
  overview: string;
  fullData: Movie | TV;
}

const HMedia: React.FC<HMediaProps> = ({ posterPath, originalTitle, releaseDate, overview, fullData }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle}</Title>
          <Release>{new Date(releaseDate).toLocaleDateString("ko", { month: "long", day: "numeric", year: "numeric" })}</Release>
          <Overview>{overview !== "" && overview?.length > 110 ? `${overview?.slice(0, 110)}...` : overview}</Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

export default HMedia;
