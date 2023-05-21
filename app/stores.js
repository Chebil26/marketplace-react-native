import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { COLORS } from "../constants";
import FeaturedStores from "../components/FeaturedStores";
const products = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView>
        <FeaturedStores />
      </ScrollView>
    </SafeAreaView>
  );
};

export default products;
