import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

import axios from "axios";
import ProductCard from "./common/cards/nearby/ProductCard";
import { COLORS, FONT, SIZES } from "../constants";
import search from "../assets/icons/search.png";

const YourComponent = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  const handleClick = () => {
    router.push(`/products`);
  };

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
  const handleKeywordChange = (keyword) => {
    onKeywordChange(keyword);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Books</Text>
        <TouchableOpacity onPress={handleClick}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {products?.map((product) => (
          <ProductCard
            product={product}
            key={`nearby-product-${product._id}`}
            handleNavigate={() =>
              router.push(`/product-details/${product._id}`)
            }
          />
        ))}
      </View>

      {/* Render pagination controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handlePrevPage}
          disabled={page === 1}
        >
          <Text style={styles.paginationButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.pageText}>{page}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handleNextPage}
          disabled={page === pages}
        >
          <Text style={styles.paginationButtonText}> {">"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#18bc9c",
  },
  headerBtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  cardsContainer: {
    marginTop: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: "#18bc9c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  paginationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  pageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#18bc9c",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
});

export default YourComponent;
