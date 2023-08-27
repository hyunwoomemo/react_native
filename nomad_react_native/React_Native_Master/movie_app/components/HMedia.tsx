import React from 'react'
import styled from 'styled-components/native'
import Poster from './Poster';

const HMedia = ({posterPath, originalTitle, releaseDate, overview}) => {
  return (
    <HMovie>
    <Poster path={posterPath} />
    <HColumn>
      <Title>{originalTitle}</Title>
      <Release>{new Date(releaseDate).toLocaleDateString("ko", { month: "long", day: "numeric", year: "numeric" })}</Release>
      <Overview>{overview !== "" && overview?.length > 110 ? `${overview?.slice(0, 110)}...` : overview}</Overview>
    </HColumn>
  </HMovie>
)
}

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

export default HMedia