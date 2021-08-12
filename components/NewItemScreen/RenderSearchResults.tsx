import React from "react";
import { View } from "react-native";

import ItemCard from "./ItemCard";

/**
 *
 * Render all the search items as card dsing
 */
const SearchResultRender = ({
  items,
  OpenModal,
}: {
  items: Array<any>;
  OpenModal: Function;
}) => {
  return (
    <View
      style={{
        margin: 20,
      }}
    >
      {items.map((data) => (
        <ItemCard
          data={data}
          key={data.food_name}
          onPress={() => OpenModal(data.food_name)}
        />
      ))}
    </View>
  );
};

export default SearchResultRender;
