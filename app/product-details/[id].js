import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSearchParams, useNavigation } from "expo-router";
import useFetch from "../../hook/useFetch";
import { Rating } from "react-native-ratings";

const ProductDetails = () => {
  const placeholder = `https://adeem-2se9.onrender.com/images/book_placeholder.png`;
  const params = useSearchParams();
  const navigation = useNavigation();
  const id = params.id;
  const [product, setProduct] = useState(null);

  const { data, isLoading, error, refetch } = useFetch(
    `https://adeem-2se9.onrender.com/api/products/${id}`,
    {}
  );

  useEffect(() => {
    if (data) {
      setProduct(data);
      navigation.setOptions({ headerTitle: data.name });
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error: Failed to load product details
        </Text>
      </View>
    );
  }

  const categories = product.category.split(", ");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.image
                ? `https://adeem-2se9.onrender.com/${product.image}`
                : product.defaultImage
                ? product.defaultImage
                : placeholder,
            }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productAuthor}>By {product.author}</Text>
          <Text style={styles.storeName}>Store: {product.store}</Text>
          <Text style={styles.productPrice}>Price: {product.price} DA</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productRating}>
            Average Rating: {product.rating}
          </Text>
          <View style={styles.reviewsContainer}>
            {product.reviews.length === 0 ? (
              <Text>No reviews available</Text>
            ) : (
              product.reviews.map((review) => (
                <View key={review._id} style={styles.reviewContainer}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={review.rating}
                  />
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  productAuthor: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  storeName: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
  },
  productDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  categoryButtonText: {
    fontSize: 12,
    color: "#333",
  },
  errorText: {
    color: "#FF5733",
    fontSize: 14,
    textAlign: "center",
  },
  productRating: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewsContainer: {
    marginTop: 10,
  },
  reviewContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
  },
});
