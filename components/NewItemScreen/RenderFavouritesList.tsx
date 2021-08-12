import React from "react";
import { View } from "react-native";

import FavouriteCard from "./FavouriteCard";
import { useGlobal } from "../../global/provider";

/**
 * Render the favourite item list
 * The data is taken from the loca state
 */
const FavouritesRender = ({ session }) => {
  const {
    state: { favourites },
  } = useGlobal();
  return (
    <View style={{ margin: 20 }}>
      {favourites.map((favourite) => (
        <FavouriteCard
          key={favourite.id as number}
          item={favourite}
          session={session}
        />
      ))}
    </View>
  );
};

export default FavouritesRender;
