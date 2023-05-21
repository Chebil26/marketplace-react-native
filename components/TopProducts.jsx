import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Most Popular Books</Text>
      <FlatList
        data={topProducts}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => router.push(`/product-details/${item._id}`)}
          >
            <Image
              source={{ uri: `https://adeem-2se9.onrender.com${item.image}` }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productAuthor}>By {item.author}</Text>
            <Text style={styles.productAuthor}> {item.store}</Text>
            <Text style={styles.productPrice}>Price: {item.price}DA</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
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
});

export default TopProducts;
