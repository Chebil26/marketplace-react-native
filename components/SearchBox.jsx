import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function SearchBox() {
  const navigation = useNavigation();
  const route = useRoute();

  const [keyword, setKeyword] = useState("");

  const submitHandler = () => {
    if (keyword) {
      navigation.navigate("/", { keyword, page: 1 });
    } else {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setKeyword}
        placeholder="Search..."
        value={keyword}
      />
      <Button title="Search" onPress={submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default SearchBox;
