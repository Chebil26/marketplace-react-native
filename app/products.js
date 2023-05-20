import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ProductList from "../components/ProductList";
import { COLORS } from "../constants";
const products = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView>
        <ProductList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default products;
