import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import useFetch from "../hook/useFetch";
import { useRouter } from "expo-router";
import moment from "moment";

const PostList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data, isLoading, error, refetch } = useFetch(
    "https://adeem-2se9.onrender.com/api/blogs/posts"
  );

  const handleClick = (postId) => {
    router.push(`/post-details/${postId}`);
  };

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Blogs</Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storeContainer}
      >
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => handleClick(post.id)}
            style={styles.storeItem}
          >
            <Image
              source={{ uri: `https://adeem-2se9.onrender.com${post.image}` }}
              style={styles.storeImage}
              resizeMode="cover"
            />
            <Text style={styles.storeName}>{post.title}</Text>
            <Text style={styles.storeWilaya}>By {post.store}</Text>
            <Text style={styles.date}>
              {moment(post.date_created).format("MMMM Do, YYYY")}
            </Text>
            <Text style={styles.storeWilaya}>{post.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleClick} style={styles.showAllButton}>
        <Text style={styles.headerBtn}>Show all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  heading: {
    color: "#18bc9c",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    fontSize: 20,
    padding: 8,
  },
  storeContainer: {
    paddingHorizontal: 8,
  },
  storeItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  storeName: {
    marginTop: 8,
    fontWeight: "bold",
  },
  storeWilaya: {
    color: "#888",
  },
  date: {
    color: "#888",
    marginTop: 4,
  },
  showAllButton: {
    marginLeft: "auto",
  },
  headerBtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});

export default PostList;
