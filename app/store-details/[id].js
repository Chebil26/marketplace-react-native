import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const StoreDetails = () => {
  const params = useSearchParams();
  const id = params.id;
  const [store, setStore] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading, error, refetch } = useFetch(
    `https://adeem-2se9.onrender.com/api/stores/${id}`,
    {} // Add any additional query parameters if needed
  );

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <View style={styles.container}>{error}</View>;
  }

  if (!store) {
    return (
      <View style={styles.container}>
        <Text>Error: Failed to load product details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://adeem-2se9.onrender.com${store.image}` }}
        style={styles.productImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{store.name}</Text>

        <Text style={styles.productAuthor}>{store.description}</Text>
      </View>
    </View>
  );
};

export default StoreDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    width: 160,
    height: 240,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productAuthor: {
    fontSize: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
