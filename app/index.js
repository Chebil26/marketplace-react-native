import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";

import FeaturedStores from "../components/FeaturedStores";
import ProductList from "../components/ProductList";
import TopProducts from "../components/TopProducts";
import SearchBar from "../components/SearchBar";
import BottomHeader from "../components/BottomHeader";
import { COLORS, SIZES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
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

  const handleSearchButtonPress = () => {
    router.push("/products");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              height: 80,
              backgroundColor: "#185b89",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              Adeem
            </Text>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchButtonPress}
          >
            <Text style={styles.searchButtonText}>
              Search for any book you want{" "}
              <MaterialIcons name="search" size={28} color="#185b89" />
            </Text>
          </TouchableOpacity>
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
        {!isKeyboardVisible && <BottomHeader />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: "#18bc9c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: SIZES.medium,
    alignItems: "center",
  },
  searchButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Home;
