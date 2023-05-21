import { Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenHeaderBtn } from "../components";
import ProductList from "../components/ProductList";
import TopProducts from "../components/TopProducts";
import PostList from "../components/PostsList";
import FeaturedStores from "../components/FeaturedStores";
import Header from "../components/Header";
import { COLORS, icons, images, SIZES } from "../constants";

const Home = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header />
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            paddingBottom: insets.bottom, // Adjust padding to accommodate safe area
          }}
        >
          {!isKeyboardVisible && <FeaturedStores />}
          {!isKeyboardVisible && <TopProducts />}
          <ProductList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
