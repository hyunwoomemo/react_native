import React, { useState } from "react";

import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeparator } from "../components/HList";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: trendingLoading,
    data: trendingData,
  } = useQuery(["tv", "trending"], tvApi.trending, {
  });
  const { isLoading: todayLoading, data: todayData } = useQuery(["tv", "today"], tvApi.airingToday);
  const { isLoading: topLoading, data: topData } = useQuery(["tv", "top"], tvApi.topRated);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  const loading = trendingLoading || todayLoading || topLoading;

  if (loading) {
    return <Loader />;
  }


  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 30 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
