import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import ProductCard from "./ProductCard";
import { COLORS, FONT, SIZES } from "../constants";
import SearchBar from "./SearchBar";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "Fiction",
    "Mystery",
    "Non fiction",
    "Science Fiction",
    "Historical Fiction",
    "Fantasy",
    "Romance",
    "Biography",
    "Self Help",
    "Classics",
  ];

  const handleClick = () => {
    router.push(`/products`);
  };

  const filterHandler = (category) => {
    setSelectedCategory(category.toLowerCase());
    setKeyword(category.toLowerCase());
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

  const handleSearch = () => {
    setPage(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Books</Text>
        <TouchableOpacity onPress={handleClick}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollViewContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton]}
              onPress={() => filterHandler(category)}
            >
              <Text style={[styles.categoryButtonText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  categoriesContainer: {
    marginTop: 10,
    marginBottom: 2,
  },
  categoriesScrollViewContent: {
    paddingLeft: 20,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#ECFFED",
    borderWidth: 0.5,
    borderColor: "#82F586",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#0E6C03",
  },
});

export default ProductList;
