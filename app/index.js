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
    navigation.setOptions({
      headerTitle: "Adeem",
      headerShown: true,
      headerStyle: {
        backgroundColor: "#185b89",
      },
      headerTitleStyle: {
        fontSize: 24,
        color: COLORS.white,
        fontWeight: "bold",
      },
    });

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
  }, [navigation]);

  const handleSearchButtonPress = () => {
    router.push("/books");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchButtonPress}
          >
            <View style={styles.searchButtonContent}>
              <Text style={styles.searchButtonText}>
                Find any book in Algeria
              </Text>
              <MaterialIcons name="search" size={30} color="white" />
            </View>
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
    backgroundColor: "#7BB44D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1,
    alignItems: "center",
  },
  searchButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
});

export default Home;
