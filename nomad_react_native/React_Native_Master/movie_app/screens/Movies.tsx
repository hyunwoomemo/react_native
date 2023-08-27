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
import { Movie, MovieResponse, moviesApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
  const { isLoading: nowPlayingLoading, data: nowPlayingData, refetch: refetchNowPlaying, isRefetching: isRefetchingNowPlaying } = useQuery<MovieResponse>("nowPlaying", moviesApi.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData, refetch: refetchUpcoming, isRefetching: isRefetchingUpcoming } = useQuery<MovieResponse>("upcoming", moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData, refetch: refetchTrending, isRefetching: isRefetchingTrending } = useQuery<MovieResponse>("trending", moviesApi.trending);

  const onRefresh = async () => {
    refetchNowPlaying();
    refetchUpcoming();
    refetchTrending();
  };

  const renderVMedia = ({ item }: { item: Movie }) => <HMedia posterPath={item.poster_path} originalTitle={item.original_title} releaseDate={item.release_date} overview={item.overview} />;
  const renderHMedia = ({ item }: { item: Movie }) => <VMedia posterPath={item.poster_path} originalTitle={item.original_title} voteAverage={item.vote_average} />;

  const VSeparator = styled.View`
    height: 20px;
  `;
  const HSeparator = styled.View`
    width: 20px;
  `;

  const movieKeyExtractor = (item) => item.id;

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <LoaderView>
      <ActivityIndicator />
    </LoaderView>
  ) : upcomingData ? (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 30 }} loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false}>
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendingScroll
                data={trendingData.results}
                keyExtractor={movieKeyExtractor}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={HSeparator}
                renderItem={renderHMedia}
              />
            ) : null}
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.results}
      contentContainerStyle={{ paddingBottom: 30 }}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
  ) : null;
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
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

export default Movies;
