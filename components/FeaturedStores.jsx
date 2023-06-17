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

const FeaturedStores = () => {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const { data, isLoading, error, refetch } = useFetch(
    "https://adeem-2se9.onrender.com/api/stores"
  );

  const handleClick = () => {
    router.push(`/stores`);
  };

  useEffect(() => {
    if (data) {
      setStores(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Stores</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storeContainer}
      >
        {stores.map((store) => (
          <TouchableOpacity
            key={store.id}
            onPress={() => router.push(`/store-details/${store.id}`)}
            style={styles.storeItem}
          >
            <Image
              source={{ uri: `https://adeem-2se9.onrender.com${store.image}` }}
              style={styles.storeImage}
              resizeMode="cover"
            />
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.storeWilaya}>{store.wilaya}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleClick} style={styles.showAllButton}>
        <Text style={styles.headerBtn}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  heading: {
    color: "#7BB44D",
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
    width: 180,
    height: 150,
    borderRadius: 8,
  },
  storeName: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#185b89",
  },
  storeWilaya: {
    color: "#185b89",
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

export default FeaturedStores;
