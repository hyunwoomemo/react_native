import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, View } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;

      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const { isLoading: trendingLoading, data: trendingData, hasNextPage: hasNextPageTrending, fetchNextPage: fetchNextPageTrending } = useInfiniteQuery<MovieResponse>(["movies", "trending"], moviesApi.trending, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;

      return nextPage > currentPage.total_pages ? null : nextPage;
    }
  });

  console.log(trendingData)

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const renderVMedia = ({ item }: { item: Movie }) => (
    <HMedia posterPath={item.poster_path} originalTitle={item.original_title} releaseDate={item.release_date} overview={item.overview} fullData={item} />
  );

  const VSeparator = styled.View`
    height: 20px;
  `;

  const movieKeyExtractor = (item: any) => item.id;

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
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
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? <HList title="Trending Movies" data={trendingData?.pages.map(page => page.results).flat()} hasNextPageTrending={hasNextPageTrending} fetchNextPageTrending={fetchNextPageTrending} /> : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.pages.map((page) => page.results).flat()}
      contentContainerStyle={{ paddingBottom: 30 }}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
  ) : null;
};

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

export default Movies;
