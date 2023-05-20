import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../app/utils/utils";

const ProductCard = ({ product, handleNavigate }) => {
  console.log(`https://adeem-2se9.onrender.com${product.image}`);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={`https://adeem-2se9.onrender.com${product.image}`}
          resizeMode="contain"
          style={styles.logoImage}
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
