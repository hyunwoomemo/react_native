import React from "react";

import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeparator } from "../components/HList";

const Tv = () => {
    const queryClient = useQueryClient()
  const { isLoading: trendingLoading, data: trendingData, isRefetching:trendingRefetching  } = useQuery(["tv","trending"], tvApi.trending);
  const { isLoading: todayLoading, data: todayData, isRefetching:todayRefetching  } = useQuery(["tv","today"], tvApi.airingToday);
  const { isLoading: topLoading, data: topData, isRefetching:topRefetching } = useQuery(["tv","top"], tvApi.topRated);

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  }
  const loading = trendingLoading || todayLoading || topLoading;
  const refreshing = trendingRefetching || todayRefetching || topRefetching;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 30 }} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results}/>
    </ScrollView>
  );
};

export default Tv;
