import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const ProductDetails = ({ route }) => {
  const params = useSearchParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading, error, refetch } = useFetch(
    `https://adeem-2se9.onrender.com/api/products/${id}`,
    {} // Add any additional query parameters if needed
  );

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  //   useEffect(() => {
  //     const fetchProductDetails = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://adeem-2se9.onrender.com/api/products/${id}`
  //         );
  //         const data = await response.json();
  //         setProduct(data);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchProductDetails();
  //   }, [id]);

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

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Error: Failed to load product details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://adeem-2se9.onrender.com${product.image}` }}
        style={styles.productImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productAuthor}>By {product.author}</Text>
        <Text style={styles.productAuthor}>By {product.store}</Text>
        <Text style={styles.productPrice}>Price: {product.price}DA</Text>
        <Text style={styles.productAuthor}>{product.description}</Text>
      </View>
    </View>
  );
};

export default ProductDetails;

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
