import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = () => {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(false);

  const toggleHeader = () => {
    setShowHeader(!showHeader);
  };

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
    <>
      <TouchableOpacity onPress={toggleHeader} style={styles.menuButton}>
        <MaterialCommunityIcons name="menu" size={24} color="black" />
      </TouchableOpacity>
      {showHeader && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleHomeClick}
            style={styles.routeButton}
          >
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleStoresClick}
            style={styles.routeButton}
          >
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>Stores</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleProductsClick}
            style={styles.routeButton}
          >
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>Products</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePostsClick}
            style={styles.routeButton}
          >
            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>Blogs</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    backgroundColor: "#18bc9c",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    zIndex: 1,
  },
  routeButton: {
    marginBottom: 8,
  },
  routeContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Header;
