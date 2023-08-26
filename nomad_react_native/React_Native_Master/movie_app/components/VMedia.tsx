import React from "react";
import styled from "styled-components/native";
import Poster from './Poster';

interface VMediaProps {
  movie: object
}

const VMedia = ({posterPath, originalTitle, voteAverage}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 ? "..." : null}
      </Title>
      <Votes>{voteAverage > 0 ? `⭐️ ${voteAverage.toFixed(1)}/10` : "Coming soon"}</Votes>
    </Movie>
  );
};

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;


export default VMedia;
