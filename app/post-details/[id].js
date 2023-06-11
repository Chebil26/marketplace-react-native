import { useSearchParams } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useFetch from "../../hook/useFetch";

const PostDetails = () => {
  const params = useSearchParams();
  const id = params.id;
  const [post, setPost] = useState(null);

  const { data, isLoading, error, refetch } = useFetch(
    `https://adeem-2se9.onrender.com/api/blogs/posts/${id}`,
    {}
  );

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Failed to load post details</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <View style={styles.imageContainer}>
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
        </View> */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{post.title}</Text>
          <Text style={styles.productAuthor}>By {post.store}</Text>
          <Text style={styles.date}>
            {moment(post.date_created).format("MMMM Do, YYYY")}
          </Text>

          <Text style={styles.productDescription}>{post.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetails;

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
