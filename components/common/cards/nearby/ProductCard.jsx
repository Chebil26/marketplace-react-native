import React from "react";
import styles from "./productcard.style";

import { Image, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ product, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      key={`nearby-product-${product._id}`}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: `https://adeem-2se9.onrender.com${product.image}`,
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

export default ProductCard;
