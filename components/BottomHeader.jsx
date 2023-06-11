import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const BottomHeader = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleStoresClick = () => {
    router.push("/stores");
  };

  const handleProductsClick = () => {
    router.push("/products");
  };

  const handlePostsClick = () => {
    router.push("/posts");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomeClick} style={styles.bottomButton}>
        <MaterialIcons name="home" size={28} color="#185b89" />
        <Text style={styles.bottomButtonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleProductsClick}
        style={styles.bottomButton}
      >
        <MaterialIcons name="menu-book" size={28} color="#185b89" />
        <Text style={styles.bottomButtonText}>Books</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleStoresClick} style={styles.bottomButton}>
        <MaterialIcons name="store" size={28} color="#185b89" />
        <Text style={styles.bottomButtonText}>Stores</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePostsClick} style={styles.bottomButton}>
        <MaterialIcons name="book" size={28} color="#185b89" />
        <Text style={styles.bottomButtonText}>Blogs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default BottomHeader;
