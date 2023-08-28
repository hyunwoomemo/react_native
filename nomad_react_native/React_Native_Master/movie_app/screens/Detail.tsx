import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Movie, TV, moviesApi, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
  const {isLoading: moviesLoading, data: moviesData} = useQuery(["movies", params.id], moviesApi.detail, { enabled: "original_title" in params });
  const {isLoading: tvLoading, data: tvData} = useQuery(["tv", params.id], tvApi.detail, { enabled: "original_name" in params });
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  console.log('movies', moviesData)
  console.log('tv', tvData)

  return (
    <Container>
      <Header>
        <Background style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(params.backdrop_path || "") }} />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"original_title" in params ? params.original_title : params.original_name}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 36px;
  align-self: flex-end;
  flex-shrink: 1;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 30px;
  padding: 0 20px;
`;

export default Detail;
