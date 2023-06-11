import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import search from "../assets/icons/search.png";

const SearchBar = ({ keyword, setKeyword, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Search"
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Image
          source={search}
          resizeMode="contain"
          style={styles.searchBtnImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#18bc9c",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
});

export default SearchBar;
