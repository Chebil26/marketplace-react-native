import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import { Popularjobs, ScreenHeaderBtn, Welcome } from "../components";
import TopProducts from "../components/TopProducts";
import ProductList from "../components/ProductList";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = () => {
  const router = useRouter();

  //   const [searchTerm, setSearchTerm] = useState("");
  const [isKeywordChanging, setIsKeywordChanging] = useState(false);
  const handleKeywordChange = (newKeyword) => {
    // Perform any checks or actions based on the new keyword value
    setIsKeywordChanging(true);
    // Additional logic...
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          {/* <Welcome
          // searchTerm={searchTerm}
          // setSearchTerm={setSearchTerm}
          // handleClick={() => {
          //   if (searchTerm) {
          //     router.push(`/search/${searchTerm}`);
          //   }
          // }}
          /> */}
          {/* <Popularjobs /> */}

          <TopProducts />
          <ProductList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
