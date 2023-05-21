import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import PostList from "../components/PostsList";
import { COLORS } from "../constants";
const posts = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView>
        <PostList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default posts;
