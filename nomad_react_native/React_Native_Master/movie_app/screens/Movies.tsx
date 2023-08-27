import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, View } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery } from "react-query";
import { moviesApi } from "../api";

const API_KEY = "eb400500dfc44b019afb2686e4475988";

const nowUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery("nowPlaying", moviesApi.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery("upcoming", moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData } = useQuery("trending", moviesApi.trending);

  const onRefresh = async () => {};

  const renderVMedia = ({ item }) => <HMedia posterPath={item.poster_path} originalTitle={item.original_title} releaseDate={item.release_date} overview={item.overview} />;
  const renderHMedia = ({ item }) => <VMedia posterPath={item.poster_path} originalTitle={item.original_title} voteAverage={item.vote_average} />;

  const VSeparator = styled.View`
    height: 20px;
  `;
  const HSeparator = styled.View`
    width: 20px;
  `;

  const movieKeyExtractor = (item) => item.id;

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <LoaderView>
      <ActivityIndicator />
    </LoaderView>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 30 }} loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false}>
            {nowPlayingData.results.map((movie) => (
              <Slide key={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData.results}
              keyExtractor={movieKeyExtractor}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={HSeparator}
              renderItem={renderHMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      contentContainerStyle={{ paddingBottom: 30 }}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
  );
};

const LoaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

export default Movies;
