import { useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import useFetch from "../../hook/useFetch";
import axios from "axios";
import { useRouter } from "expo-router";
import ProductCard from "../../components/ProductCard";
import { COLORS } from "../../constants";
const StoreDetails = () => {
  const router = useRouter();

  const params = useSearchParams();
  const id = params.id;
  const [store, setStore] = useState(null);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  //   const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading, error, refetch } = useFetch(
    `https://adeem-2se9.onrender.com/api/stores/${id}`,
    {} // Add any additional query parameters if needed
  );

  // const { productData, isLoadingProduct, errorproduct } = useFetch(
  //   `https://adeem-2se9.onrender.com/api/products/store/1`,
  //   {} // Add any additional query parameters if needed
  // );

  // console.log(productData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://adeem-2se9.onrender.com/api/products?page=${page}&keyword=${keyword}`
        );
        const { products, page: responsePage, pages } = response.data;
        setProducts(products);
        setPage(page);
        setPages(pages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [page, keyword]);

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);
  console.log(products);

  const storeProducts = products.filter(
    (product) => product.store === store.name
  );

  console.log(storeProducts);

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
  console.log(store);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image
          source={{ uri: `https://adeem-2se9.onrender.com${store.image}` }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{store.name}</Text>
        <Text style={styles.productAuthor}>{store.description}</Text>
        <Text style={styles.storeAddress}>{store.address}</Text>
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView>
          {/* <ProductList /> */}

          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {"   "} {store.name}'s Books
            </Text>
          </View>
          <View style={styles.cardsContainer}>
            {storeProducts?.map((product) => (
              <ProductCard
                product={product}
                key={`nearby-product-${product._id}`}
                handleNavigate={() =>
                  router.push(`/product-details/${product._id}`)
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default StoreDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },

  ImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  productAuthor: {
    fontSize: 16,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },

  storeAddress: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 2,
  },

  cardsContainer: {
    marginTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#18bc9c",
  },
});
