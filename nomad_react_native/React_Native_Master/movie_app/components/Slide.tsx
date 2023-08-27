import { BlurView } from "@react-native-community/blur";
import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from './Poster';
import Votes from './Votes';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({ backdropPath, posterPath, originalTitle, voteAverage, overview }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg source={{ uri: makeImgPath(backdropPath) }} style={StyleSheet.absoluteFill} blurRadius={20}>
        </BgImg>
      <View>
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? <Votes votes={voteAverage} /> : null}
            <Overview isDark={isDark}>{overview.length > 80 ? `${overview.slice(0, 80)}...` : overview.slice(0, 80)}</Overview>
          </Column>
        </Wrapper>
      </View>
    </View>
  );
};

const BgImg = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.5;
`;
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 25px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)")};
`;

export default Slide;
