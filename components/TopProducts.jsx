import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ProductCard from "./ProductCard";
import { useRouter } from "expo-router";
import axios from "axios";
import useFetch from "../hook/useFetch";

const TopProducts = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch(
    `https://adeem-2se9.onrender.com/api/products/top`,
    {}
  );

  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    if (data) {
      setTopProducts(data);
    }
  }, [data]);

  const handleNavigate = (productId) => {
    router.push(`/product-details/${productId}`);
  };

  const scrollViewRef = useRef(null);

  const handleScrollRight = () => {
    scrollViewRef.current.scrollTo({ x: 120, animated: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Most Popular Books</Text>

      <View style={styles.productsContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {topProducts.map((item) => (
            <ProductCard
              product={item}
              key={`nearby-product-${item._id}`}
              handleNavigate={() => router.push(`/product-details/${item._id}`)}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.scrollIndicator}
          onPress={handleScrollRight}
        >
          <MaterialCommunityIcons name="chevron-right" size={24} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  productsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productContainer: {
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    width: 120,
    height: 200,
  },
  productImage: {
    width: 60,
    height: 90,
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productAuthor: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 10,
    color: "gray",
  },
  headerTitle: {
    fontSize: 20,
    padding: 6,
    fontWeight: "bold",
    color: "#18bc9c",
    alignSelf: "center",
  },
  scrollIndicator: {
    marginLeft: 10,
  },
});

export default TopProducts;
