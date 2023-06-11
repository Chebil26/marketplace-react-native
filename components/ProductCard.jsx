import React from "react";
import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ product, handleNavigate }) => {
  const placeholder = `https://adeem-2se9.onrender.com/images/book_placeholder.png`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      key={`nearby-product-${product._id}`}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: product.image
              ? `${process.env.REACT_APP_API_SERVER}${product.image}`
              : product.defaultImage
              ? product.defaultImage
              : placeholder,
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {product.author}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {product.store}
        </Text>
        <Text style={styles.jobPrice} numberOfLines={1}>
          {product.price}DA
        </Text>

        {/* Add other product details */}
        {/* <Text style={styles.jobType}>{product.job_employment_type}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 75,
    height: 110,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobPrice: {
    fontSize: SIZES.medium - 2,
    fontFamily: "DMBold",
    color: COLORS.secondary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default ProductCard;
