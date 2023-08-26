import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, View } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const API_KEY = "eb400500dfc44b019afb2686e4475988";

const nowUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
const upcomingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getNowPlaying = async () => {
    const response = await fetch(nowUrl);
    const { results } = await response.json();
    setNowPlaying(results);
    setLoading(false);
  };

  const getUpcoming = async () => {
    const response = await fetch(upcomingUrl);
    const { results } = await response.json();
    setUpcoming(results);
    setLoading(false);
  };

  const getTrending = async () => {
    const response = await fetch(trendingUrl);
    const { results } = await response.json();
    setTrending(results);
    console.log(results);
    setLoading(false);
  };

  const getData = async () => {
    // wait for all of them
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

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
            {nowPlaying.map((movie) => (
              <Slide key={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trending}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              renderItem={({ item }) => <VMedia posterPath={item.poster_path} originalTitle={item.original_title} voteAverage={item.vote_average} />}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
        data={upcoming}
        contentContainerStyle={{ paddingBottom: 30 }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      renderItem={({ item }) => <HMedia posterPath={item.poster_path} originalTitle={item.original_title} releaseDate={item.release_date} overview={item.overview} />}
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
