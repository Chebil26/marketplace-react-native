import { COLORS } from "../constants";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import useFetch from "../hook/useFetch";
import { useRouter } from "expo-router";

const Stores = () => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={styles.container}>
        <Text style={styles.heading}>All Stores</Text>

        <View style={styles.storeContainer}>
          {stores.map((store) => (
            <TouchableOpacity
              key={store.id}
              onPress={() => router.push(`/store-details/${store.id}`)}
              style={styles.storeItem}
            >
              <Image
                source={{
                  uri: `https://adeem-2se9.onrender.com${store.image}`,
                }}
                style={styles.storeImage}
                resizeMode="cover"
              />
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeWilaya}>{store.wilaya}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 16, // Add margin bottom to create vertical spacing
  },
  storeImage: {
    width: 300,
    height: 200,
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

export default Stores;
