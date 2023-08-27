import React from "react";
import styled from "styled-components/native";
import Poster from './Poster';
import Votes from './Votes';

interface VMediaProps {
  movie: object
}

const VMedia = ({posterPath, originalTitle, voteAverage}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle?.slice(0, 13)}
        {originalTitle?.length > 13 ? "..." : null}
      </Title>
      {voteAverage > 0 ? <Votes votes={voteAverage} /> : null}
      {/* <Votes votes={voteAverage}>{voteAverage > 0 ? `⭐️ ${voteAverage.toFixed(1)}/10` : "Coming soon"}</Votes> */}
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


export default VMedia;
