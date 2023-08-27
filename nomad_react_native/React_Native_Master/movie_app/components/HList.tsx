import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { Movie, TV } from "../api";

interface HListProps {
  title: string;
  data: Movie[] | TV[];
}
const keyExtractor = (item: Movie | TV, index: number) => item.id.toString();

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HListSeparator}
        data={data}
        renderItem={({ item }) => <VMedia posterPath={item.poster_path} originalTitle={"original_title" in item ? item.original_title : item.original_name} voteAverage={item.vote_average} fullData={item} />}
      />
    </ListContainer>
  );
};

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

export default HList;
