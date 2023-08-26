import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, RefreshControl, ScrollView } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "eb400500dfc44b019afb2686e4475988";

const nowUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
const upcomingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = useState(false)
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
    await getData()
    setRefreshing(false)
  }

  return loading ? (
    <LoaderView>
      <ActivityIndicator />
    </LoaderView>
  ) : (
      <Container
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      <Swiper containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4, marginBottom: 30 }} loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false}>
        {nowPlaying.map((movie) => (
          <Slide key={movie.id} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} originalTitle={movie.original_title} voteAverage={movie.vote_average} overview={movie.overview} />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll contentContainerStyle={{ paddingLeft: 30 }} horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>{movie.vote_average > 0 ? `⭐️ ${movie.vote_average.toFixed(1)}/10` : "Coming soon"}</Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>
              {movie.original_title}
            </Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString('ko', {month: 'long', day: 'numeric', year: 'numeric'})}
            </Release>
            <Overview>{movie.overview !== '' && movie.overview.length > 110 ? `${movie.overview.slice(0, 110)}...` : movie.overview}</Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

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

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
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

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`

export default Movies;
